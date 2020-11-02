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

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type patientOmitSSN = Omit<Patient, 'ssn'>;
export type newPatientEntry = Omit<Patient, 'id'>;