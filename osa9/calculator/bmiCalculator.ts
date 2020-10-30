export const calculateBmi = (height: number, weight: number): string => {
  const result = weight / Math.pow(height*0.01,2);
  switch (true) {
    case result < 15:
      return ('Very severely underweight');
    case result < 16:
      return ('Severely underweight');
    case result < 18.5:
      return ('Underweight');
    case result < 25:
      return ('Normal (healthy weight)');
    case result < 30:
      return ('Overweight');
    case result < 35:
      return ('Obese Class I (Moderately obese)');
    case result < 40:
      return ('Obese Class II (Severely obese)');
    case result < 100:
      return ('Obese Class III (Very severely obese)');
    default:
      return('Maybe some onformation is missing?');
  }
};

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

console.log(calculateBmi(a,b));
