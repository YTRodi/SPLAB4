import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    private userService: UserService
  ) {
    this.registerForm = new FormBuilder().group({
      email: new FormControl('prueba@gmail.com', [Validators.required]),
      password: new FormControl('123456', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      type: new FormControl(this.types.STUDENT, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  handlePhoto(event: any): void {
    this.photo = event.target.files[0];
  }

  async sendForm() {
    try {
      const { email, password, photo, type } = this.registerForm.getRawValue();
      const newUser: User = { email, password, photo, type };

      const userCredentials =
        await this.authService.registerWithEmailAndPassword(newUser);

      this.userService.preAddAndUploadImage(
        { ...newUser, userUid: userCredentials.uid },
        FolderImages.users,
        [this.photo]
      );
    } catch (error) {
      // Crear componente para los errores.
      errorNotification({ text: error.message });
    }
  }
}
