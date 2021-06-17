import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @Input() selectedUser: User | null;

  constructor() {
    this.selectedUser = null;
  }

  ngOnInit(): void {}
}
