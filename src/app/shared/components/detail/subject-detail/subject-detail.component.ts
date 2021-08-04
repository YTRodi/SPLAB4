import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  errorNotification,
  successNotification,
} from 'src/app/helpers/notifications';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';
import { SubjectService } from 'src/app/protected/services/subject.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css'],
})
export class SubjectDetailComponent implements OnInit {
  @Input() showStudentsList: boolean = true;
  @Input() studentToInscription: User | null = null;

  @Input() selectedsUsers: Array<User> = [];
  @Input() selectedSubject: Subject | null;
  @Output() onRemoveUserInList: EventEmitter<any> = new EventEmitter();

  constructor(private subjectService: SubjectService) {
    this.selectedSubject = null;
  }

  ngOnInit(): void {}

  onRemoveUser(user: User) {
    const filteredArray = this.selectedsUsers.filter(
      (userInArray) => userInArray.uid !== user.uid
    );

    this.onRemoveUserInList.emit(filteredArray);
  }

  onSaveInscription(): any {
    if (!this.studentToInscription) {
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

      const studentExists = this.selectedSubject.students.find(
        (studentInSubject: User): any => {
          for (const studentSelected of this.selectedsUsers) {
            if (studentSelected.email === studentInSubject.email) {
              return true;
            }
          }
        }
      );

      if (studentExists) {
        return errorNotification({
          title: 'Alumno ya inscripto',
          text: `El alumno con el email: ${studentExists.email} ya está inscripto a ${this.selectedSubject.name}`,
        });
      }

      const totalStudents = this.selectedsUsers.length;

      if (totalStudents > this.selectedSubject.places) {
        return errorNotification({
          title: 'No hay cupos para tantos alumnos',
          text: `Cupos disponibles: ${this.selectedSubject.places}`,
        });
      }

      const updatedSubject: Subject = {
        ...this.selectedSubject,
        places: this.selectedSubject.places - this.selectedsUsers.length,
        students: [...this.selectedSubject.students, ...this.selectedsUsers],
      };

      this.subjectService.updateSubjectData(updatedSubject);
      this.selectedsUsers = [];
      this.selectedSubject = null;
      return successNotification({ text: 'La inscripción fue exitosa' });
    }

    const studentAlreadyInscripted = this.selectedSubject?.students.find(
      (user: User) => user.email === this.studentToInscription?.email
    );
    if (studentAlreadyInscripted) {
      return errorNotification({
        title: 'Alumno ya inscripto',
        text: `El alumno con el email: ${this.studentToInscription?.email} ya está inscripto a ${this.selectedSubject?.name}`,
      });
    }

    if (this.selectedSubject?.places === 0) {
      return errorNotification({
        title: 'Se acabaron los cupos',
        text: `Cupos disponibles: ${this.selectedSubject.places} :(`,
      });
    }

    const updatedSubject: Subject = {
      ...this.selectedSubject!,
      places: this.selectedSubject!.places - 1,
      students: [...this.selectedSubject!.students, this.studentToInscription!],
    };

    this.subjectService.updateSubjectData(updatedSubject);
    successNotification({ text: 'La inscripción fue exitosa' });

    this.selectedsUsers = [];
    this.selectedSubject = null;
  }
}
