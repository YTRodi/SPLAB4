import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FolderImages } from 'src/app/constants/images';
import { Quarters } from 'src/app/constants/quarter';
import { Types } from 'src/app/constants/types';
import {
  errorNotification,
  successNotification,
} from 'src/app/helpers/notifications';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';
import { SubjectService } from 'src/app/protected/services/subject.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css'],
})
export class SubjectFormComponent implements OnInit {
  // selectedTeacher
  @Input() selectedTeacher: User | null = null;

  // Flags to update user data
  @Input() editEneabled: boolean = false;
  @Input() subjectToEdit: Subject | null = null;

  @Input() visibleSuccessAlert: boolean = false;
  @Input() isCustomForm: boolean = false;
  @Input() titleVisible: boolean = true;
  @Input() title: string = 'Registro';
  @Input() submitText: string = 'Unirse';
  @Input() isAdminRegister: boolean = false;
  public subjectForm: FormGroup;
  public quarters = Quarters;
  private photo: any;
  public isLoading: boolean = false;

  constructor(private subjectService: SubjectService) {
    this.subjectForm = this.getSubjectForm();
  }

  ngOnInit(): void {}

  originalOrder = (a: KeyValue<any, any>, b: KeyValue<any, any>): number => {
    return 0;
  };

  getSubjectForm(subject: Subject | null = null) {
    // console.log(`subject`, subject);
    return new FormBuilder().group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      quarter: new FormControl('', [Validators.required]),
      places: new FormControl(null, [
        Validators.required,
        Validators.min(10),
        Validators.max(60),
      ]),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(2020),
        Validators.max(2050),
      ]),
      photo: new FormControl(null, [Validators.required]),
    });
  }

  handlePhoto(event: any): void {
    this.photo = event.target.files[0];
  }

  getErrorMessage(formControlName: string) {
    if (this.subjectForm.get(formControlName)?.touched) {
      if (this.subjectForm.get(formControlName)?.errors?.required)
        return 'Debes ingresar un valor';

      if (this.subjectForm.get(formControlName)?.hasError('minlength')) {
        return 'Debe de contener 3 caracteres como mínimo';
      }

      if (this.subjectForm.get(formControlName)?.hasError('maxlength'))
        return 'Debe de contener 20 caracteres como máximo';

      // min - max
      if (formControlName === 'places') {
        if (this.subjectForm.get(formControlName)?.errors?.min)
          return 'El cupo mínimo debe ser de 10';
        else if (this.subjectForm.get(formControlName)?.errors?.max)
          return 'El cupo máximo debe ser de 60';
      }

      if (formControlName === 'age') {
        if (this.subjectForm.get(formControlName)?.errors?.min)
          return 'El año tiene que ser mayor a 2020';
        else if (this.subjectForm.get(formControlName)?.errors?.max)
          return 'El año tiene que ser menor a 2050';
      }
    }

    return '';
  }

  async sendForm(): Promise<any> {
    this.isLoading = true;
    try {
      if (!this.selectedTeacher) {
        return errorNotification({ text: 'No hay un profesor seleccionado' });
      }

      const { name, quarter, places, age } = this.subjectForm.getRawValue();
      const newSubject: Subject = {
        name,
        quarter,
        places,
        age,
        teacher: this.selectedTeacher,
        students: [],
      };

      this.subjectService.preAddAndUploadImage(newSubject, FolderImages.other, [
        this.photo,
      ]);

      this.isLoading = false;

      successNotification({ text: 'La materia fue dada de alta con éxito' });

      this.subjectForm.reset();
      this.subjectForm.get('quarter')?.setValue('');
      this.selectedTeacher = null;
    } catch (error) {
      errorNotification({ text: error.message });
    }
  }
}
