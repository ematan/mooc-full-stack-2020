import express from 'express';
const patientsRouter = express.Router();
import patients from '../data/patients';
import toNewPatientEntry from '../utils';
import { patientOmitSSN, Patient, newPatientEntry} from '../types';
import { v4 as uuid } from 'uuid';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isError(error: any | undefined): error is Error {
  return error && ((error as Error).message !== undefined);
}

patientsRouter.get('/', (_req, res) => {
  const result = getPatients();
  if(result) res.send(result);
  else res.send('error');
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = getPatientByID(id);
  if (patient) {
    return res.send(patient);
  } else {
    return res.status(404).send({error: 'we have an error'});
  }
});


patientsRouter.post('/', (req, res) => {
  try {
    const patient =  req.body as newPatientEntry;
    const newPatient = postPatient(patient);
    res.send(newPatient);
  } catch (error) {
    const message = isError(error) ? error.message : 'error happened';
    res.status(404).send(message);
  }
});

export default patientsRouter;