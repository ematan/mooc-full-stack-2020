import React from 'react'

const Header = ({course}) => (
    <h1>{course}</h1>
)


const Part = ({part}) => (
	<p>{part.name} {part.exercises}</p>
)

const Content = ({parts}) => {
  const all_parts = () => 
    parts.map((part) => <Part key={part.id} part={part} />)
  return (
    <div>
			{all_parts()}
  	</div>
  )
}

const Total = ({parts}) => {
  const tot = parts.reduce((s,p) => s+p.exercises, 0)
  return (
    <p><b>Total of {tot} exercises</b></p>
  )
}

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course