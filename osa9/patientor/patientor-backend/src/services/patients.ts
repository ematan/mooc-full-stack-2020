import patients from '../data/patients';
import toNewPatientEntry from '../utils';
import { v4 as uuid } from 'uuid';
import { patientOmitSSN, Patient, newPatientEntry} from '../types';


const getPatients = (): patientOmitSSN[] => {
  const ssnRemoved = patients.map(({ ssn: _ssn, ...rest}) => {
    return rest;
  });
  return ssnRemoved;
};

const getPatientByID = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const postPatient = (newPatient: newPatientEntry): Patient => {
  const id = uuid();
  const patient = toNewPatientEntry(newPatient);
  const p = {id, ...patient};
  patients.push(p);
  return p;
};

export default {
  getPatients, getPatientByID, postPatient
};