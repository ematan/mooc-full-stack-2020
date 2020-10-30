import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());




import { calculateBmi } from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';



app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});



//http://localhost:3001/bmi?height=180&weight=72

app.get('/bmi', (req, res) => {
  const h = Number(req.query.height);
  const w = Number(req.query.weight);
  let result;
  if (isNaN(h) || isNaN(w)){
    result = { error: 'malformatted parameters' };
  } else {
    const bmi: string = calculateBmi(h, w);
    result = {
      weight: w,
      height: h,
      bmi: bmi
    };
  }

  res.send(result);
});

//http://localhost:3001/bmi?height=180&weight=72


type RequestBody = {
  daily_exercises : number[],
  target: number,
};

app.post('/exercise', (req, res) => {
  const args = req.body as RequestBody;

  if (!('daily_exercises' in args && 'target' in args)){
    return res.send({ error: 'parameters missing'});
  }

  const target: number = args.target;
  const daily: number[] = args.daily_exercises;

  let result;
  if (isNaN(target) || !daily.every(n => !isNaN(n))){
    result = { error: 'malformatted parameters' };
  } else {
    result = calculateExercises(daily, target);
  }

  return res.send(result);
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});













