import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-create-subjects-screen',
  templateUrl: './create-subjects-screen.component.html',
  styleUrls: ['./create-subjects-screen.component.css'],
})
export class CreateSubjectsScreenComponent implements OnInit {
  public selectedTeacher: any;

  constructor() {}

  ngOnInit(): void {}

  setSelectedTeacher(user: User) {
    this.selectedTeacher = user;
  }
}
