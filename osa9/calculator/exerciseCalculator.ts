type ExerciseResult = {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
};


export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const sum = dailyHours.reduce((a, b) => a + b, 0);
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h !== 0).length;
  const average = (sum /periodLength) || 0;
  const success = average >= target;
  const rating = (Math.abs(average-target) < 0.4) ? 2 : ((average-target > 0) ? 3 : 2);
  const ratingDescription = (rating: number) => {
    switch (rating) {
      case 1:
        return ('try harder next time');
      case 2:
        return ('not too bad but could be better');
      case 3:
        return ('well done');
      default:
        return ('oops');
    }
  };

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription(rating),
    target: target,
    average: average,
  };

};

/*
interface MultiplyValues {
  value1: number;
  value2: number[];
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.slice(2).every(a => !isNaN(Number(a)))) {

    const value1 = Number(args[2]);
    const value2 = args.slice(3).map(a => Number(a));

    return {value1: value1, value2: value2};
  }
  throw new Error('Provided values were not numbers!');
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  const res = calculateExercises(value2, value1);
  console.log(res);
} catch (e) {
  console.log(e);
}

*/