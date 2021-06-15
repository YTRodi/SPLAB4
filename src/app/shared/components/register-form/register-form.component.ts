import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';
import { FolderImages } from 'src/app/constants/images';
import { Types } from 'src/app/constants/types';
import { errorNotification } from 'src/app/helpers/notifications';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  @Input() isAdminRegister: boolean = false;
  public registerForm: FormGroup;
  public types = Types;
  private photo: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = new FormBuilder().group({
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
      photo: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  handlePhoto(event: any): void {
    this.photo = event.target.files[0];
  }

  getErrorMessage(formControlName: string) {
    if (this.registerForm.get(formControlName)?.touched) {
      if (this.registerForm.get(formControlName)?.errors?.required)
        return 'Debes ingresar un valor';

      if (this.registerForm.get(formControlName)?.hasError('minlength')) {
        return 'Debe de contener 6 caracteres como mínimo';
      }

      if (this.registerForm.get(formControlName)?.hasError('maxlength'))
        return 'Debe de contener 20 caracteres como máximo';

      // min - max
      // if (formControlName === 'age') {
      //   if (this.registerForm.get(formControlName)?.errors?.min)
      //     return 'La edad debe ser como mínimo de 1 años';
      //   else if (this.registerForm.get(formControlName)?.errors?.max)
      //     return 'La edad debe ser como máximo de 99 años';
      // }

      if (this.registerForm.get(formControlName)?.hasError('email'))
        return 'Email no válido';
    }

    return '';
  }

  async sendForm() {
    try {
      const { email, password, photo, type } = this.registerForm.getRawValue();
      const newUser: User = { email, photo, type };

      const userCredentials =
        await this.authService.registerWithEmailAndPassword({
          email,
          password,
        });

      this.userService.preAddAndUploadImage(
        { ...newUser, userUid: userCredentials.uid },
        FolderImages.users,
        [this.photo]
      );

      this.router.navigate(['protected/home']);

      this.registerForm.reset();
    } catch (error) {
      errorNotification({ text: error.message });
    }
  }
}
