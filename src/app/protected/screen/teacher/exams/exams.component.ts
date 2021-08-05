import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { successNotification } from 'src/app/helpers/notifications';
import { Exam } from 'src/app/interfaces/exam.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ExamService } from 'src/app/protected/services/exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
})
export class ExamsComponent implements OnInit {
  public currentUserFromDB: User | null = null;
  public selectedExam: Exam | null = null;
  public updatedExamForm: FormGroup;

  constructor(
    private authService: AuthService,
    private examService: ExamService
  ) {
    this.updatedExamForm = new FormBuilder().group({
      date: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      student: new FormControl(null, [Validators.required]),
      score: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
    });
  }

  async ngOnInit(): Promise<any> {
    const { currentUserFromDB } = await this.authService.getCurrentUser();

    this.currentUserFromDB = currentUserFromDB;
  }

  setSelectedExam(exam: Exam) {
    this.selectedExam = exam;

    // this.updatedExamForm.get('date')?.patchValue(new Date());

    const parsedDate = new Date(this.selectedExam.date);

    this.updatedExamForm.patchValue({
      date: parsedDate.toISOString().substring(0, 10),
      student: this.selectedExam.student.email,
      score: this.selectedExam.score,
    });
  }

  getErrorMessage(formControlName: string) {
    if (this.updatedExamForm.get(formControlName)?.touched) {
      if (this.updatedExamForm.get(formControlName)?.errors?.required)
        return 'Debes ingresar un valor';

      if (formControlName === 'score') {
        if (this.updatedExamForm.get(formControlName)?.errors?.min)
          return 'La nota debe ser como mínimo 1 ';
        else if (this.updatedExamForm.get(formControlName)?.errors?.max)
          return 'La nota debe ser como máximo 10 ';
      }
    }

    return '';
  }

  async sendUpdatedExam() {
    const { score } = this.updatedExamForm.getRawValue();

    const updatedExam: Exam = { ...this.selectedExam!, score };

    await this.examService.updateExamData(updatedExam);

    successNotification({
      title: 'Estado del examen',
      text: 'Se actualizó el examen con éxito!',
    });
  }
}
