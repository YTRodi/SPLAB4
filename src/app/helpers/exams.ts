import { Exam } from '../interfaces/exam.interface';

// export const groupExamsBySubjectNames = (items: Exam[]) => {
//   return items.reduce((acc: any, cur: any) => {
//     if (acc[cur.subject.name]) {
//       acc[cur.subject.name].push(cur);
//     } else {
//       acc[cur.subject.name] = [cur];
//     }

//     return acc;
//   }, {});
// };

export const groupExamsBySubjectNames = (items: Exam[]) => {
  return items.reduce((acc: any, cur: any) => {
    if (acc[cur.subject.name]) {
      acc[cur.subject.name].push(cur);
    } else {
      acc[cur.subject.name] = [cur];
    }

    return acc;
  }, {});
};
