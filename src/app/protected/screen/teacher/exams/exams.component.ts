import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
})
export class ExamsComponent implements OnInit {
  public currentUserFromDB: User | null = null;

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<any> {
    const { currentUserFromDB } = await this.authService.getCurrentUser();

    this.currentUserFromDB = currentUserFromDB;
  }
}
