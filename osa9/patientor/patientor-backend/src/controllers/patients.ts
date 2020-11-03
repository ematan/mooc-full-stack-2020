import express from 'express';
const patientsRouter = express.Router();
import { newPatientEntry} from '../types';
import patientService from '../services/patients';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isError(error: any | undefined): error is Error {
  return error && ((error as Error).message !== undefined);
}

patientsRouter.get('/', (_req, res) => {
  const result = patientService.getPatients();
  if(result) res.send(result);
  else res.send('error');
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientByID(id);
  if (patient) {
    return res.send(patient);
  } else {
    return res.status(404).send({error: 'we have an error'});
  }
});

patientsRouter.post('/', (req, res) => {
  try {
    const patient =  req.body as newPatientEntry;
    const newPatient = patientService.postPatient(patient);
    res.send(newPatient);
  } catch (error) {
    const message = isError(error) ? error.message : 'error happened';
    res.status(404).send(message);
  }
});

export default patientsRouter;