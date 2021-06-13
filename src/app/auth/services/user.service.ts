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
// import { Specialist, Admin } from 'src/app/classes/entities';
// import { FolderImages } from 'src/app/constants/images';
// import { Roles } from 'src/app/constants/roles';
// import { Patient, Specialist, Admin } from 'src/app/interfaces/entities';
// import { FileI } from '../interfaces/fileI';
// import { v4 } from 'uuid';

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
      .collection(this.nameCollectionDB)
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

  public async updateData(user: any) {
    this.itemDoc = this.afs.doc(`users/${user.uid}`);
    this.itemDoc.update(user);
  }

  public preAddAndUploadImage(
    user: any,
    folder: FolderImages,
    images: File[]
  ): void {
    this.uploadImage(user, folder, images);
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
    task
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
