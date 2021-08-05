import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Exam } from 'src/app/interfaces/exam.interface';

@Component({
  selector: 'app-listado-aprobacion-directa',
  templateUrl: './listado-aprobacion-directa.component.html',
  styleUrls: ['./listado-aprobacion-directa.component.css'],
})
export class ListadoAprobacionDirectaComponent implements OnInit, OnChanges {
  @Input() exams: Exam[] | null = null;
  @Input() title: string = 'aprobación directa';
  public filteredPromotedStudents: Exam[] | null = null;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.exams && changes.exams.currentValue) {
      const filteredPromotedStudents = changes.exams.currentValue.filter(
        (exam: Exam) => exam.score >= 6 && exam.score <= 10
      );

      this.filteredPromotedStudents = filteredPromotedStudents;
    }
  }
}
