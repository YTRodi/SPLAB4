import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inscription } from 'src/app/interfaces/inscription.interface';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private inscriptionsCollection: AngularFirestoreCollection<any>;
  private nameCollectionDB = 'inscriptions';
  public itemDoc: AngularFirestoreDocument<Inscription> | null = null;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.inscriptionsCollection = afs.collection<any>(this.nameCollectionDB);
  }

  // INSCRIPTIONS
  public getAllInscriptions(): Observable<any[]> {
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

  public async deleteInscription(uid: any) {
    this.itemDoc = this.afs.doc(`inscriptions/${uid}`);
    this.itemDoc.delete();
  }

  public async updateInscriptionData(inscription: any) {
    this.itemDoc = this.afs.doc(`inscriptions/${inscription.uid}`);
    this.itemDoc.update(inscription);
  }

  public addInscription(inscription: Inscription) {
    return this.inscriptionsCollection.add({
      ...inscription,
      createdAt: new Date().toISOString(),
    });
  }
}
