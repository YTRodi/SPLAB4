import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, first, map, tap } from 'rxjs/operators';
import { FolderImages } from 'src/app/constants/images';
import { File } from 'src/app/interfaces/file.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<any>;
  private nameCollectionDB = 'users';
  public itemDoc: AngularFirestoreDocument<User> | null = null;
  private filePath: any;
  private urlImages: Array<any> = [];

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.usersCollection = afs.collection<any>(this.nameCollectionDB);
  }

  public getAllUsers(): Observable<any[]> {
    return this.afs
      .collection(this.nameCollectionDB, (ref) =>
        ref.where('active', '==', true)
      )
      .snapshotChanges()
      .pipe(
        map((actions: any) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data() as object;
            const uid = a.payload.doc.id;

            return { uid, ...data };
          })
        )
      );
  }

  public async getAllUsersByType(
    type: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'ALL'
  ) {
    return this.afs
      .collection(this.nameCollectionDB, (ref) =>
        ref.where('type', '==', type).where('active', '==', true)
      )
      .snapshotChanges()
      .pipe(
        map((actions: any) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data() as object;
            const uid = a.payload.doc.id;

            return { uid, ...data };
          })
        )
      );
  }

  public async getUserByEmail(email: string | null | undefined) {
    return this.afs
      .collection<any>(this.nameCollectionDB, (ref) =>
        ref.where('email', '==', email)
      )
      .valueChanges()
      .pipe(
        tap((data) => data),
        first()
      )
      .toPromise();
  }

  public async deleteUser(uid: any) {
    this.itemDoc = this.afs.doc(`users/${uid}`);
    this.itemDoc.delete();
  }

  public async updateUserData(user: User) {
    this.itemDoc = this.afs.doc(`users/${user.uid}`);
    this.itemDoc.update(user);
  }

  public async preAddAndUploadImage(
    user: any,
    folder: FolderImages,
    images: File[]
  ): Promise<any> {
    return await this.uploadImage(user, folder, images);
  }

  public addUser(user: User) {
    this.usersCollection.add({
      ...user,
      photo: this.urlImages[0],
      createdAt: new Date().toISOString(),
    });
  }

  private async uploadImage(user: any, folder: FolderImages, images: File[]) {
    this.filePath = `${folder}/${images[0].name}`;

    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, images[0]);
    return task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((urlImage) => {
            this.urlImages = [...this.urlImages, urlImage].reverse();
            this.addUser(user);
          });
        })
      )
      .subscribe();
  }
}
