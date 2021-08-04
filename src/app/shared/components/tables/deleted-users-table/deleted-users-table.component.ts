import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { confirmNotification } from 'src/app/helpers/notifications';
import { DeletedUser } from 'src/app/interfaces/user.interface';
import { DeletedUsersService } from 'src/app/protected/services/deleted-users.service';

@Component({
  selector: 'app-deleted-users-table',
  templateUrl: './deleted-users-table.component.html',
  styleUrls: ['./deleted-users-table.component.css'],
})
export class DeletedUsersTableComponent implements OnInit {
  @Input() full: boolean = false;
  // @Input() studentsBySubject: Subject | null = null;
  @Input() title: string = 'usuarios borrados';
  // @Output() onSelectDeletedUser: EventEmitter<User>;
  // public currentUserFromDB: User | null = null;
  // public types = Types;
  public deletedUserList: DeletedUser[] | null = null;

  constructor(
    private deletedUsersService: DeletedUsersService,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    this.deletedUsersService
      .getAllDeletedUsers()
      .subscribe(
        (deletedUsers: DeletedUser[]) => (this.deletedUserList = deletedUsers)
      );
  }

  async onBackToTheSystem(deletedUser: DeletedUser) {
    const confirm = await confirmNotification({
      text: `Volver al sistema al usuario ${deletedUser.deletedUser.email}?`,
      confirmParams: { title: 'Usuario vuelvo al sistema!' },
    });

    if (confirm) {
      console.log(`deletedUser`, deletedUser);
      this.usersService.updateUserData({
        ...deletedUser.deletedUser,
        active: true,
      });
      this.deletedUsersService.deleteDeletedUser(deletedUser.uid);
    }
  }
}
