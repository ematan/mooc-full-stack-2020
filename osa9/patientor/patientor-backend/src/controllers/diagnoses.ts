import express from 'express';
const diagnosesRouter = express.Router();
import diagnoses from '../data/diagnoses';

diagnosesRouter.get('/', (_req, res) => {
  res.send(diagnoses);
});

export default diagnosesRouter;