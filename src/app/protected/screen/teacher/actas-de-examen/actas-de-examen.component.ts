import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Exam } from 'src/app/interfaces/exam.interface';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ExamService } from 'src/app/protected/services/exam.service';

@Component({
  selector: 'app-actas-de-examen',
  templateUrl: './actas-de-examen.component.html',
  styleUrls: ['./actas-de-examen.component.css'],
})
export class ActasDeExamenComponent implements OnInit {
  public currentUserFromDB: User | null = null;
  public selectedSubject: Subject | null = null;
  public examsBySelectedSubject: Exam[] | null = null;

  constructor(
    private authService: AuthService,
    private examService: ExamService
  ) {}

  async ngOnInit(): Promise<any> {
    const { currentUserFromDB } = await this.authService.getCurrentUser();
    this.currentUserFromDB = currentUserFromDB;
  }

  setSelectedSubject(subject: Subject) {
    this.selectedSubject = subject;

    const result = this.examService.getAllExamsByTeacher(
      this.selectedSubject.teacher
    );

    result.subscribe((examListByTeacher: Exam[]) => {
      const filteredExamsBySubjectName = examListByTeacher.filter(
        (exam: Exam) => exam.subject.name === this.selectedSubject?.name
      );

      this.examsBySelectedSubject = filteredExamsBySubjectName;
    });
  }
}
