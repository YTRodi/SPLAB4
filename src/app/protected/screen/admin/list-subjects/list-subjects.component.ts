import { Component, OnInit } from '@angular/core';
import { errorNotification } from 'src/app/helpers/notifications';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-list-subjects',
  templateUrl: './list-subjects.component.html',
  styleUrls: ['./list-subjects.component.css'],
})
export class ListSubjectsComponent implements OnInit {
  public selectedsStudents: Array<User> = [];
  public selectedSubject: Subject | null = null;
  public selectedStudent: any;

  constructor() {}

  ngOnInit(): void {}

  getTitleUsersTable() {
    return `alumnos inscriptos a ${this.selectedSubject?.name}`;
  }

  setSelectedSubject(subject: Subject) {
    this.selectedSubject = subject;
    console.log(`this.selectedSubject`, this.selectedSubject);
  }
}
