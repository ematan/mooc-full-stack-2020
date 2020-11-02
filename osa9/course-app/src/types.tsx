export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface MyCoursePart extends CoursePartWithDescription {
  name: "My own Part"
  examRequired: boolean;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCoursePart;