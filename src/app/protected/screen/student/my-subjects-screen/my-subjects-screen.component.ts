import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-my-subjects-screen',
  templateUrl: './my-subjects-screen.component.html',
  styleUrls: ['./my-subjects-screen.component.css'],
})
export class MySubjectsScreenComponent implements OnInit {
  public currentUserFromDB: User | null = null;
  public selectedSubject: Subject | null = null;

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<any> {
    const { currentUserFromDB } = await this.authService.getCurrentUser();
    this.currentUserFromDB = currentUserFromDB;
  }
  setSelectedSubject(subject: Subject) {
    this.selectedSubject = subject;
  }
}
