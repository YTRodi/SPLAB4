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
  @Input() title: string = 'usuarios borrados';
  public deletedUserList: DeletedUser[] | null = null;

  constructor(private deletedUsersService: DeletedUsersService) {}

  ngOnInit(): void {
    this.deletedUsersService
      .getAllDeletedUsers()
      .subscribe(
        (deletedUsers: DeletedUser[]) => (this.deletedUserList = deletedUsers)
      );
  }
}
