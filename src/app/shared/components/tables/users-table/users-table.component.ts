import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() title: string = 'usuarios';
  @Input() filter: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'ALL' = 'ALL';
  @Output() onSelectUser: EventEmitter<User>;
  public currentUserFromDB: User | null = null;
  public types = Types;
  public userList: Array<any> | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.onSelectUser = new EventEmitter<User>();
  }

  async ngOnInit(): Promise<void> {
    switch (this.filter) {
      case 'ALL':
        this.userService
          .getAllUsers()
          .subscribe((userList) => (this.userList = userList));
        break;

      case 'STUDENT':
        (await this.userService.getAllUsersByType(this.filter)).subscribe(
          (onlyStudents) => (this.userList = onlyStudents)
        );
        break;

      case 'TEACHER':
        (await this.userService.getAllUsersByType(this.filter)).subscribe(
          (onlyTeachers) => (this.userList = onlyTeachers)
        );
        break;

      case 'ADMIN':
        (await this.userService.getAllUsersByType(this.filter)).subscribe(
          (onlyAdmins) => (this.userList = onlyAdmins)
        );
        break;
    }

    const { currentUserFromDB } = await this.authService.getCurrentUser();
    this.currentUserFromDB = currentUserFromDB;
  }

  selectUser(selectedUser: User) {
    this.onSelectUser.emit(selectedUser);
  }

  async onDeleteUser(user: User) {
    const userType =
      user.type === Types.STUDENT
        ? 'alumno'
        : user.type === Types.TEACHER
        ? 'profesor'
        : 'administrador';

    const confirm = await confirmNotification({
      text: `Eliminar ${userType} con email ${user.email}`,
      confirmParams: { title: 'Usuario eliminado con éxito' },
    });

    if (confirm) this.userService.deleteUser(user.uid);
  }
}
