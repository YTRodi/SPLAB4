import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  errorNotification,
  successNotification,
} from 'src/app/helpers/notifications';
import { Inscription } from 'src/app/interfaces/inscription.interface';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';
import { InscriptionService } from 'src/app/protected/services/inscription.service';
import { SubjectService } from 'src/app/protected/services/subject.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css'],
})
export class SubjectDetailComponent implements OnInit {
  @Input() selectedsUsers: Array<User> = [];
  @Input() selectedSubject: Subject | null;
  @Output() onRemoveUserInList: EventEmitter<any> = new EventEmitter();

  constructor(
    private inscriptionService: InscriptionService,
    private subjectService: SubjectService
  ) {
    this.selectedSubject = null;
    // this.onRemoveUserInList = new EventEmitter<any>();
  }

  ngOnInit(): void {}

  onRemoveUser(user: User) {
    const filteredArray = this.selectedsUsers.filter(
      (userInArray) => userInArray.uid !== user.uid
    );

    this.onRemoveUserInList.emit(filteredArray);
  }

  onSaveInscription(): any {
    if (!this.selectedsUsers.length) {
      return errorNotification({
        title: 'No hay un ningún alumno seleccionado',
        text: 'Debe de seleccionar uno para poder hacer la inscripción',
      });
    }

    if (!this.selectedSubject) {
      return errorNotification({
        title: 'No hay una materia seleccionada',
        text: 'Debe de seleccionar una para poder hacer la inscripción',
      });
    }

    const totalStudents = this.selectedsUsers.length - 1;
    if (totalStudents > this.selectedSubject.places) {
      const exceedPlaces = this.selectedSubject.places - totalStudents;

      return errorNotification({
        title: 'No hay cupos para tantos alumnos',
        text: `Cupos disponibles: ${this.selectedSubject.places}. Se excedió ${exceedPlaces}`,
      });
    }

    const newInscription: Inscription = {
      students: this.selectedsUsers,
      subject: this.selectedSubject,
    };

    const updatedSubject: Subject = {
      ...this.selectedSubject,
      places: this.selectedSubject.places - (this.selectedsUsers.length - 1),
    };

    this.inscriptionService.addInscription(newInscription);
    this.subjectService.updateSubjectData(updatedSubject);

    successNotification({ text: 'La inscripción fue exitosa' });

    this.selectedsUsers = [];
    this.selectedSubject = null;
  }
}
