import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, first, map, tap } from 'rxjs/operators';
import { FolderImages } from 'src/app/constants/images';
import { Subject } from 'src/app/interfaces/subject.interface';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private subjectsCollection: AngularFirestoreCollection<any>;
  private nameCollectionDB = 'subjects';
  public itemDoc: AngularFirestoreDocument<Subject> | null = null;
  private filePath: any;
  private urlImages: Array<any> = [];

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage // La materia puede tenér una foto
  ) {
    this.subjectsCollection = afs.collection<any>(this.nameCollectionDB);
  }

  public getAllSubjects(): Observable<any[]> {
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

  public async deleteSubject(uid: any) {
    this.itemDoc = this.afs.doc(`subjects/${uid}`);
    this.itemDoc.delete();
  }

  public async updateSubjectData(subject: any) {
    this.itemDoc = this.afs.doc(`subjects/${subject.uid}`);
    this.itemDoc.update(subject);
  }

  public preAddAndUploadImage(
    user: any,
    folder: FolderImages,
    images: File[]
  ): void {
    this.uploadImage(user, folder, images);
  }

  public addSubject(subject: Subject) {
    // todo: El return lo agrego ahora que NO tengo foto en la materia
    return this.subjectsCollection.add({
      ...subject,
      // photo: this.urlImages[0], // Agregar cuando tenga la imagen.
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
            this.addSubject(user);
          });
        })
      )
      .subscribe();
  }
}
