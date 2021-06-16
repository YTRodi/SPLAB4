import { Component, OnInit } from '@angular/core';

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

  setSelectedUser(user: any) {
    this.selectedUser = user;
  }
}
