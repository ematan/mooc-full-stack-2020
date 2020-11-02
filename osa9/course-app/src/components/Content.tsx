import React from "react";
import { PartType } from '../types'

interface PartProps {
  part: PartType;
}

const Part: React.FC<PartProps> = ({part}) => (
  <p>{part.name} {part.exerciseCount}</p>
)

interface ContentProps {
  content: PartType[];
}

const Content: React.FC<ContentProps> = ({content}) => (
  <div>
    <Part part={content[0]} />
    <Part part={content[1]} />
    <Part part={content[2]} />
  </div>
)


export default Content;