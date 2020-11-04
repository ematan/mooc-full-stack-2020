/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {  newPatientEntry,
          Gender,
          Entry,
          HospitalEntry,
          OccupationalHealthcareEntry,
          HealthCheckEntry,
          BaseEntry,
       } from '../types';

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


const isBaseEntry = (entry: any): entry is BaseEntry => {
  if (
    entry.id && isString(entry.id) &&
    entry.description && isString(entry.description) &&
    entry.date && isDate(entry.date) &&
    entry.specialist && isString(entry.specialist)
  ) {
    if (entry.diagnosisCodes){
      return isString(entry.diagnosisCodes);
    }
    return true;
  }
  return false;
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  if (entry.type && entry.type === 'Hospital'){
    return(
      entry.discharge &&
      Object.keys(entry.discharge).includes('date') &&
      Object.keys(entry.discharge).includes('criteria')
    );
  }
  return false;
};

const isOccupationalHealthcareEntry = (entry: any): entry is OccupationalHealthcareEntry => {
  if (entry.type && entry.type === 'OccupationalHealthcare' && entry.employerName) {
      if (entry.sickLeave) {
        return(
          Object.keys(entry.sickLeave).includes('startDate') &&
          Object.keys(entry.sickLeave).includes('endDate')
        );
      }
    return true;
  }
  return false;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  if (entry.type && entry.type === 'HealthCheck'){
    if(!(entry.healthCheckRating === undefined)){
      return (
        0 <= entry.healthCheckRating &&
        entry.healthCheckRating < 4
      );
    }
  }
  return false;
};


const isEntry = (entry: any): entry is Entry => {
  if (!isBaseEntry) throw new Error('not even a base entry :(');
  return (
    isHospitalEntry(entry) ||
    isOccupationalHealthcareEntry(entry) ||
    isHealthCheckEntry(entry)
  );
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Entries missing');
  }
  return entries.map(e => {
    console.log(e);
    if (!isEntry(e)){
      throw new Error('Not an entry');
    } else {
      return e;
    }
  });
};


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): newPatientEntry => {
  const newPatient: newPatientEntry = {
    name: parseName(object.name),
    gender: parseGender(object.gender),
    dateOfBirth: parseDOB(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
  return newPatient;
};

export default toNewPatientEntry;