import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-users-screen',
  templateUrl: './users-screen.component.html',
  styleUrls: ['./users-screen.component.css'],
})
export class UsersScreenComponent implements OnInit {
  public listTitle: string = 'administradores';
  public selectedUser: any;

  constructor() {}

  ngOnInit(): void {}

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }
}
