import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  public selectedFilter: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'ALL' = 'ALL';

  constructor() {}

  ngOnInit(): void {}

  setSelectedFilter(value: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'ALL') {
    this.selectedFilter = value;
  }
}
