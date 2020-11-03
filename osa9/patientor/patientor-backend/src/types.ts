export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type patientOmitSSN = Omit<Patient, 'ssn' | 'entries' >;
export type newPatientEntry = Omit<Patient, 'id'>;