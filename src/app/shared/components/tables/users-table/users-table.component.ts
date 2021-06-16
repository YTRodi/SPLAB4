import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';
import { Types } from 'src/app/constants/types';
import { confirmNotification } from 'src/app/helpers/notifications';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  public currentUserFromDB: User | null = null;
  public types = Types;
  public userList: Array<any> | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userService
      .getAllUsers()
      .subscribe((userList) => (this.userList = userList));

    const { currentUserFromDB } = await this.authService.getCurrentUser();
    this.currentUserFromDB = currentUserFromDB;
  }

  async onDeleteUser(user: User) {
    const userType = {
      [Types.STUDENT]: 'alumno',
      [Types.TEACHER]: 'profesor',
      [Types.ADMIN]: 'administrador',
    }[user.type];

    const confirm = await confirmNotification({
      text: `Eliminar ${userType} con email ${user.email}`,
      confirmParams: {
        title: 'Usuario eliminado con éxito',
      },
    });

    if (confirm) this.userService.deleteUser(user.uid);
  }
}
