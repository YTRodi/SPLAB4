import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RegisterFormComponent],
})
export class SharedModule {}
