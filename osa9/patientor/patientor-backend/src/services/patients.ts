import patients from '../data/patients';
import utils from '../utils';
import { v4 as uuid } from 'uuid';
import { patientOmitSSN, Patient, newPatientEntry, newEntry, Entry} from '../types';


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
  const patient = utils.toNewPatientEntry(newPatient);
  const p = {id, ...patient};
  patients.push(p);
  return p;
};

const postEntry = (newEntry: newEntry, patientID: string):Entry => {
  const id = uuid();
  const entry: newEntry = utils.toNewEntry(newEntry);
  const withId: Entry  = { ...entry, id };
  patients.forEach((p) => {
    if (p.id === patientID) {
      p.entries.push(withId);
    }
    //return p;
  });
  return withId;
};

export default {
  getPatients, getPatientByID, postPatient, postEntry
};