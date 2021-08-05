import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { successNotification } from 'src/app/helpers/notifications';
import { Exam } from 'src/app/interfaces/exam.interface';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ExamService } from 'src/app/protected/services/exam.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css'],
})
export class ExamFormComponent implements OnInit, OnChanges {
  @Input() subject: Subject | null = null;
  public selectedStudent: User | null = null;
  public examForm: FormGroup;
  public isLoading: boolean = false;

  constructor(private examService: ExamService) {
    this.examForm = new FormBuilder().group({
      date: new FormControl(null, [Validators.required]),
      student: new FormControl(null, [Validators.required]),
      score: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.subject && changes.subject.currentValue) {
      this.selectedStudent = null;
    }
  }

  setSelectedStudent(selectedStudent: User) {
    this.selectedStudent = selectedStudent;
    this.examForm.patchValue({ student: this.selectedStudent.email });
  }

  getErrorMessage(formControlName: string) {
    if (this.examForm.get(formControlName)?.touched) {
      if (this.examForm.get(formControlName)?.errors?.required)
        return 'Debes ingresar un valor';

      if (formControlName === 'score') {
        if (this.examForm.get(formControlName)?.errors?.min)
          return 'La nota debe ser como mínimo 1 ';
        else if (this.examForm.get(formControlName)?.errors?.max)
          return 'La nota debe ser como máximo 10 ';
      }
    }

    return '';
  }

  async sendExam() {
    this.isLoading = true;
    const { date, score } = this.examForm.getRawValue();

    const parsedDate = new Date(date).toISOString();
    const exam: Exam = {
      date: parsedDate,
      subject: this.subject!,
      student: this.selectedStudent!,
      score,
    };

    await this.examService.addExam(exam);
    this.isLoading = false;

    successNotification({
      title: 'Estado del examen',
      text: 'Se cargó la nota del examen con éxito!',
    });

    this.examForm.reset();
    this.selectedStudent = null;
  }
}
