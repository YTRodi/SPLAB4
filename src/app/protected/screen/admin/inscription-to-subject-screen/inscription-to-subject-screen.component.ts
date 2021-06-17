import { Component, OnInit } from '@angular/core';
import { errorNotification } from 'src/app/helpers/notifications';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-inscription-to-subject-screen',
  templateUrl: './inscription-to-subject-screen.component.html',
  styleUrls: ['./inscription-to-subject-screen.component.css'],
})
export class InscriptionToSubjectScreenComponent implements OnInit {
  public selectedsStudents: Array<User> = [];
  public selectedStudent: any;
  public selectedSubject: any;

  constructor() {}

  ngOnInit(): void {}

  setSelectedSubject(subject: Subject) {
    this.selectedSubject = subject;
  }

  setSelectedStudent(user: User) {
    this.selectedStudent = user;
    this.addUserInArray(user);
  }

  addUserInArray(user: User): any {
    const userExistsInArray = this.selectedsStudents.some(
      (userInArray) => userInArray === user
    );

    if (userExistsInArray) {
      return errorNotification({
        text: 'El alumno ya está agregado a la lista',
      });
    }

    this.selectedsStudents = [...this.selectedsStudents, user];
  }

  removeUserInArray(filteredArray: Array<User>) {
    this.selectedsStudents = filteredArray;
  }
}
