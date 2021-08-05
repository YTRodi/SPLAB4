import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Directive({
  selector: '[appUserEmail]',
})
export class UserEmailDirective implements OnInit {
  constructor(private authService: AuthService, private el: ElementRef) {}

  async ngOnInit(): Promise<any> {
    const { currentUserFromDB } = await this.authService.getCurrentUser();

    this.el.nativeElement.textContent = currentUserFromDB.email;
  }
}
