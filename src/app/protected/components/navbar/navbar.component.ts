import { Component, OnInit } from '@angular/core';
import { Nav } from 'src/app/interfaces/nav.interface';

import firebase from 'firebase/app';
import { Types } from 'src/app/constants/types';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public currentUser: firebase.User | null;
  public currentUserFromDB: any | null;

  public isStudent: boolean;
  public isTeacher: boolean;
  public isAdmin: boolean;

  public navStudent: Nav[] = [
    // { to: '/auth/register', routeName: 'Mis turnos' },
    // { to: '/auth/register', routeName: 'Solicitar turno' },
    // { to: '/my-profile', routeName: 'Mi Perfil' },
  ];

  public navTeacher: Nav[] = [
    // { to: '/auth/register', routeName: 'Mis turnos' },
    // { to: '/my-profile', routeName: 'Mi Perfil' },
  ];

  public navAdmin: Nav[] = [
    { to: '/admin/users', routeName: 'Usuarios' },
    { to: '/admin/create-subject', routeName: 'Alta de materia' },
    { to: '/admin/incription-to-subject', routeName: 'Incripción a materias' },
    { to: '/admin/list-of-subjects', routeName: 'Lista de materias' },
    { to: '/admin/list-of-users', routeName: 'Lista de usuarios' },
  ];

  constructor(public authService: AuthService, private router: Router) {
    this.currentUser = null;
    this.currentUserFromDB = null;
    this.isStudent = false;
    this.isTeacher = false;
    this.isAdmin = false;
  }

  async ngOnInit(): Promise<void> {
    const { currentUser, currentUserFromDB } =
      await this.authService.getCurrentUser();
    this.currentUser = currentUser;
    this.currentUserFromDB = currentUserFromDB;

    this.isStudent = this.currentUserFromDB.type === Types.STUDENT;
    this.isTeacher = this.currentUserFromDB.type === Types.TEACHER;
    this.isAdmin = this.currentUserFromDB.type === Types.ADMIN;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
