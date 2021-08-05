import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Exam } from 'src/app/interfaces/exam.interface';

@Component({
  selector: 'app-listado-no-directa',
  templateUrl: './listado-no-directa.component.html',
  styleUrls: ['./listado-no-directa.component.css'],
})
export class ListadoNoDirectaComponent implements OnInit {
  @Input() exams: Exam[] | null = null;
  @Input() title: string = 'no directa';
  public notDirectList: Exam[] | null = null;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.exams && changes.exams.currentValue) {
      const filteredPromotedStudents = changes.exams.currentValue.filter(
        (exam: Exam) => {
          const isNotDirect = exam.score >= 1 && exam.score < 6;

          return isNotDirect;
        }
      );

      this.notDirectList = filteredPromotedStudents;
    }
  }
}
