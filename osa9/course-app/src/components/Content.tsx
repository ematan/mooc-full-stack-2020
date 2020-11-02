import React from "react";
import { CoursePart } from '../types';

import Part from './Part';

interface ContentProps {
  content: CoursePart[];
}

const Content: React.FC<ContentProps> = ({content}) => (
  <div>
    <Part part={content[0]} />
    <Part part={content[1]} />
    <Part part={content[2]} />
    <Part part={content[3]} />
  </div>
)


export default Content;