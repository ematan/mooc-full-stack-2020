/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { newPatientEntry, Gender } from '../types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseDOB = (dob: any): string => {
  if (!dob || !isString(dob) || !isDate(dob)){
    throw new Error(`Incorrect or missing date: ${dob}`);
  }
  return dob;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): newPatientEntry => {
  const newPatient: newPatientEntry = {
    name: parseName(object.name),
    gender: parseGender(object.gender),
    dateOfBirth: parseDOB(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
  };
  return newPatient;
};

export default toNewPatientEntry;