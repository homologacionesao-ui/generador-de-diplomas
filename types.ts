
export interface DiplomaData {
  studentName: string;
  courseGrade: string;
  courseName: string;
  date: string;
  directorName: string;
  secretaryName: string;
}

export interface DiplomaSettings {
  studentNameScale: number;
  courseGradeScale: number;
  courseNameScale: number;
  dateScale: number;
  directorNameScale: number;
  secretaryNameScale: number;
}

export const DEFAULT_SETTINGS: DiplomaSettings = {
  studentNameScale: 1,
  courseGradeScale: 1,
  courseNameScale: 1,
  dateScale: 1,
  directorNameScale: 1,
  secretaryNameScale: 1,
};

export enum DiplomaStyle {
  Classic = 'Classic',
  Modern = 'Modern',
  Elegant = 'Elegant',
  Formal = 'Formal',
}
