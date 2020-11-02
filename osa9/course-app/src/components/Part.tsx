import React from "react";
import { CoursePart } from '../types'

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({part}) => {
  switch (part.name) {
    case 'Fundamentals': {
      return (
      <p><b>{part.name}</b><br /> {part.description}<br />Exercise Count: {part.exerciseCount}</p>
      )
    }
    case 'Using props to pass data': {
      return (
        <p><b>{part.name}</b><br />Group project count: {part.groupProjectCount}<br />Exercise Count:  {part.exerciseCount}</p>
      )

    }
    case 'Deeper type usage': {
      return (
      <p><b>{part.name}</b><br /> {part.description}<br />Exercise Count:  {part.exerciseCount}<br /> {part.exerciseSubmissionLink}</p>
      )

    }
    case 'My own Part': {
      return (
      <p><b>{part.name}</b><br /> {part.description}<br />Exercise Count: {part.exerciseCount} <br />
      Exam required: {part.examRequired.toString()}</p>
      )

    }
    default:
      return assertNever(part);
  }
}


export default Part;