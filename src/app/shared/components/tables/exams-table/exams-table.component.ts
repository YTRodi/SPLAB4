import { KeyValue } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { groupExamsBySubjectNames } from 'src/app/helpers/exams';
import { Exam } from 'src/app/interfaces/exam.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ExamService } from 'src/app/protected/services/exam.service';

@Component({
  selector: 'app-exams-table',
  templateUrl: './exams-table.component.html',
  styleUrls: ['./exams-table.component.css'],
})
export class ExamsTableComponent implements OnInit, OnChanges {
  @Input() teacher: User | null = null;
  @Input() title: string = 'examenes';
  public examList: any | null = null;

  constructor(private examService: ExamService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.teacher && changes.teacher.currentValue) {
      const result = this.examService.getAllExamsByTeacher(
        changes.teacher.currentValue
      );

      result.subscribe((examsByTeacher: Exam[]) => {
        const groupExamsBySubjectName =
          groupExamsBySubjectNames(examsByTeacher);
        this.examList = groupExamsBySubjectName;
      });
    }
  }

  originalOrder = (a: KeyValue<any, any>, b: KeyValue<any, any>): any => {
    return 0;
  };

  checkEmptyExamList(): any {
    if (this.examList) {
      return Object.keys(this.examList).length === 0;
    }
  }

  checkExamList(): any {
    if (this.examList) {
      return Object.keys(this.examList).length !== 0;
    }
  }

  checkExamListGrouped(): any {
    if (this.examList) {
      return Object.keys(this.examList).length;
    }
  }
}
