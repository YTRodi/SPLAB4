import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { errorNotification } from 'src/app/helpers/notifications';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  public testStudent = {
    email: 'alumno@gmail.com',
    password: '123456',
  };
  public testTeacher = {
    email: 'octavio@gmail.com',
    password: '123456',
  };
  public testAdmin = {
    email: 'admin@gmail.com',
    password: '123456',
  };
  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormBuilder().group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    });
  }

  ngOnInit(): void {}

  loadStudent() {
    this.loginForm.get('email')?.setValue(this.testStudent.email);
    this.loginForm.get('password')?.setValue(this.testStudent.password);
  }

  loadTeacher() {
    this.loginForm.get('email')?.setValue(this.testTeacher.email);
    this.loginForm.get('password')?.setValue(this.testTeacher.password);
  }

  loadAdmin() {
    this.loginForm.get('email')?.setValue(this.testAdmin.email);
    this.loginForm.get('password')?.setValue(this.testAdmin.password);
  }

  getErrorMessage(formControlName: string) {
    if (this.loginForm.get(formControlName)?.touched) {
      if (this.loginForm.get(formControlName)?.errors?.required)
        return 'Debes ingresar un valor';

      if (this.loginForm.get(formControlName)?.hasError('minlength')) {
        return 'Debe de contener 6 caracteres como mínimo';
      }

      if (this.loginForm.get(formControlName)?.hasError('maxlength'))
        return 'Debe de contener 20 caracteres como máximo';

      if (this.loginForm.get(formControlName)?.hasError('email'))
        return 'Email no válido';
    }

    return '';
  }

  async sendForm() {
    try {
      const { email, password } = this.loginForm.getRawValue();

      await this.authService.loginWithEmailAndPassword(email, password);

      this.router.navigate(['dashboard']);

      this.loginForm.reset();
    } catch (error) {
      errorNotification({ text: error.message });
    }
  }
}
