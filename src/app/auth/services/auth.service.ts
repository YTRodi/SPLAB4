import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public secondaryApp = firebase.initializeApp(
    environment.firebaseConfig,
    'Secondary'
  );
  public currentUser: firebase.User | null = null;
  public currentUserFromDB: any = null;

  constructor(
    public afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.User | null> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return await this.afAuth.signInWithPopup(provider);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async registerWithEmailAndPassword(
    payload: any,
    isAdminRegister: boolean
  ): Promise<any> {
    try {
      const { email, password } = payload;

      if (isAdminRegister) {
        const { user } = await this.secondaryApp
          .auth()
          .createUserWithEmailAndPassword(email, password);

        return user;
      } else {
        const { user } = await this.afAuth.createUserWithEmailAndPassword(
          email,
          password
        );

        return user;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async sendVerificationEmail(): Promise<any> {
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

  async getCurrentUser(): Promise<any> {
    this.currentUser = await this.afAuth.currentUser;

    this.currentUserFromDB = (
      await this.userService.getUserByEmail(this.currentUser?.email)
    )[0];

    return {
      currentUser: this.currentUser,
      currentUserFromDB: this.currentUserFromDB,
    };
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
