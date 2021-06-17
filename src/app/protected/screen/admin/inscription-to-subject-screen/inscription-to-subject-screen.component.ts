import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-inscription-to-subject-screen',
  templateUrl: './inscription-to-subject-screen.component.html',
  styleUrls: ['./inscription-to-subject-screen.component.css'],
})
export class InscriptionToSubjectScreenComponent implements OnInit {
  public selectedStudent: any;
  public selectedSubject: any;

  constructor() {}

  ngOnInit(): void {}

  setSelectedSubject(subject: Subject) {
    this.selectedSubject = subject;
  }

  setSelectedStudent(user: User) {
    this.selectedStudent = user;
  }
}
