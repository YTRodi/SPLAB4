import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { confirmNotification } from 'src/app/helpers/notifications';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';
import { SubjectService } from 'src/app/protected/services/subject.service';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.css'],
})
export class SubjectsTableComponent implements OnInit, OnChanges {
  @Input() isAdmin: boolean = false;
  @Input() full: boolean = false;
  @Input() showTeacher: boolean = false;
  @Input() detailEneabled: boolean = false;
  @Input() subjectsByStudentParams: User | null = null;
  @Input() subjectsByTeacherParams: User | null = null;
  @Input() title: string = 'usuarios';
  // @Input() filter: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'ALL' = 'ALL';
  @Output() onSelectSubject: EventEmitter<Subject>;
  public subjectsList: Subject[] | null = null;
  public currentUserFromDB: any;

  constructor(
    private subjectService: SubjectService,
    private authService: AuthService
  ) {
    this.onSelectSubject = new EventEmitter<Subject>();
  }

  async ngOnInit(): Promise<any> {
    const { currentUserFromDB } = await this.authService.getCurrentUser();
    this.currentUserFromDB = currentUserFromDB;
  }

  async ngOnChanges(changes: SimpleChanges): Promise<any> {
    this.subjectService
      .getAllSubjects()
      .subscribe((subjectsList) => (this.subjectsList = subjectsList));

    if (
      changes.subjectsByStudentParams &&
      changes.subjectsByStudentParams.currentValue
    ) {
      this.subjectService
        .getAllSubjects()
        .subscribe((subjectsList: Subject[]) => {
          const student = changes.subjectsByStudentParams.currentValue as User;

          this.subjectsList = subjectsList.filter((subject: Subject) => {
            return subject.students.some(
              (studentInSubject) => studentInSubject.email === student.email
            );
          });
        });
    }

    if (
      changes.subjectsByTeacherParams &&
      changes.subjectsByTeacherParams.currentValue
    ) {
      const result = await this.subjectService.getSubjectsByTeacherEmail(
        changes.subjectsByTeacherParams.currentValue.email
      );

      return result.subscribe((subjects: Subject[]) => {
        this.subjectsList = subjects;
      });
    }
  }

  selectSubject(selectedSubject: Subject) {
    this.onSelectSubject.emit(selectedSubject);
  }

  transformQuarter(quarter: string) {
    if (quarter === 'FIRST') return 'Primer cuatrimestre';
    if (quarter === 'SECOND') return 'Segundo cuatrimestre';
    if (quarter === 'THIRD') return 'Tercer cuatrimestre';
    if (quarter === 'FOURTH') return 'Cuarto cuatrimestre';
    if (quarter === 'FIFTH') return 'Quinto cuatrimestre';
    if (quarter === 'SIXTH') return 'Sexto cuatrimestre';
    return '';
  }

  async onDeleteSubject(subject: Subject) {
    const confirm = await confirmNotification({
      text: `Eliminar la materia ${subject.name}`,
      confirmParams: { title: 'Materia eliminada con éxito' },
    });

    if (confirm) this.subjectService.deleteSubject(subject.uid);
  }
}
