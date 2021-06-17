import { Component, Input, OnInit } from '@angular/core';
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
  @Input() selectedSubject: Subject | null;
  @Input() selectedUser: User | null;

  constructor(
    private inscriptionService: InscriptionService,
    private subjectService: SubjectService
  ) {
    this.selectedSubject = null;
    this.selectedUser = null;
  }

  ngOnInit(): void {}

  onSaveInscription(): any {
    if (!this.selectedUser) {
      return errorNotification({
        title: 'No hay un usuario seleccionado',
        text: 'Debe de seleccionar uno para poder inscribirlo',
      });
    }

    if (!this.selectedSubject) {
      return errorNotification({
        title: 'No hay una materia seleccionada',
        text: 'Debe de seleccionar una para poder hacer la inscripción',
      });
    }

    const newInscription: Inscription = {
      student: this.selectedUser,
      subject: this.selectedSubject,
    };

    const updatedSubject: Subject = {
      ...this.selectedSubject,
      places: this.selectedSubject.places - 1,
    };

    this.inscriptionService.addInscription(newInscription);
    this.subjectService.updateSubjectData(updatedSubject);

    successNotification({ text: 'La inscripción fue exitosa' });

    this.selectedSubject = null;
    this.selectedUser = null;
  }
}
