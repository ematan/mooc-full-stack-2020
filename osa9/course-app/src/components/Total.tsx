import React from "react";
import { CoursePartBase } from '../types';

interface TotalProps {
  content: CoursePartBase[];
}

const Total: React.FC<TotalProps> = ({ content }) => {
  const calculation = content.reduce((sum, part) => sum + part.exerciseCount, 0);
  return (
    <p>Number of exercises {calculation}</p>
  )
}

export default Total;