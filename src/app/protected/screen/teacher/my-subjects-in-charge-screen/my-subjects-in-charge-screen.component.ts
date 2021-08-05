import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-my-subjects-in-charge-screen',
  templateUrl: './my-subjects-in-charge-screen.component.html',
  styleUrls: ['./my-subjects-in-charge-screen.component.css'],
})
export class MySubjectsInChargeScreenComponent implements OnInit {
  public currentUserFromDB: User | null = null;
  public selectedSubject: Subject | null = null;

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<any> {
    const { currentUserFromDB } = await this.authService.getCurrentUser();
    this.currentUserFromDB = currentUserFromDB;

    console.log(`this.currentUserFromDB`, this.currentUserFromDB);
  }

  setSelectedSubject(subject: Subject) {
    this.selectedSubject = subject;

    console.log(`this.selectedSubject`, this.selectedSubject);
  }
}
