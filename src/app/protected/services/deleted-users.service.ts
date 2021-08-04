import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeletedUser } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DeletedUsersService {
  private deletedUsersCollection: AngularFirestoreCollection<any>;
  private nameCollectionDB = 'deleted-users';
  public itemDoc: AngularFirestoreDocument<DeletedUser> | null = null;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.deletedUsersCollection = afs.collection<any>(this.nameCollectionDB);
  }

  public getAllDeletedUsers(): Observable<any[]> {
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

  public addDeletedUser(user: DeletedUser) {
    this.deletedUsersCollection.add({
      ...user,
      deletedAt: new Date().toISOString(),
    });
  }

  public async deleteDeletedUser(uid: any) {
    this.itemDoc = this.afs.doc(`deleted-users/${uid}`);
    this.itemDoc.delete();
  }
}
