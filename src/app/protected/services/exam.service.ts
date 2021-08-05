import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exam } from 'src/app/interfaces/exam.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private examsCollection: AngularFirestoreCollection<any>;
  private nameCollectionDB = 'exams';
  public itemDoc: AngularFirestoreDocument<Exam> | null = null;

  constructor(private afs: AngularFirestore) {
    this.examsCollection = afs.collection<any>(this.nameCollectionDB);
  }

  public getAllExams(): Observable<any[]> {
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

  // public getAllExamsByStudent(user: User): Observable<any[]> {
  //   return this.afs
  //     .collection(this.nameCollectionDB, (ref) =>
  //       ref.where('students', 'array-contains', user)
  //     )
  //     .snapshotChanges()
  //     .pipe(
  //       map((actions: any) =>
  //         actions.map((a: any) => {
  //           const data = a.payload.doc.data() as object;
  //           const uid = a.payload.doc.id;

  //           return { uid, ...data };
  //         })
  //       )
  //     );
  // }

  public getAllExamsByTeacher(teacher: User): Observable<any[]> {
    return this.afs
      .collection(this.nameCollectionDB, (ref) =>
        ref.where('subject.teacher.email', '==', teacher.email)
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

  public async deleteExam(uid: any) {
    this.itemDoc = this.afs.doc(`exams/${uid}`);
    this.itemDoc.delete();
  }

  public async updateExamData(exam: any) {
    this.itemDoc = this.afs.doc(`exams/${exam.uid}`);
    this.itemDoc.update(exam);
  }

  public addExam(exam: Exam) {
    return this.examsCollection.add(exam);
  }
}
