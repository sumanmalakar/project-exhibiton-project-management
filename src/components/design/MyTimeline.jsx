import React, { useState } from 'react';
import './Timeline.css'; // Import your timeline styling
import { Link } from 'react-router-dom';

const MyTimeline = () => {
  const [events, setevents] = useState([{
    title:"Project 1",
    date:"Manager 1",
    description: ` Total Task - 230 \n Completed Tasks - 100 \n Pending Tasks - 130 `

  },
  {
    title:"Project 2",
    date:"Manager 2",
    description:" Total Task - 230 \n Completed Tasks - 100 \n Pending Tasks - 130"
  },
  {
    title:"Project 3",
    date:"Manager 3",
    description:" Total Task - 230 \n Completed Tasks - 100 \n Pending Tasks - 130"

  },
  {
    title:"Project 4", 
    date:"Manager 4",
    description:" Total Task - 230 \n Completed Tasks - 100 \n Pending Tasks - 130"
  },

])
  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div className="timeline-event" key={index}>
          <div className="timeline-event-header">
            <h3 className="event-title">{event.title}</h3>
            <span className="event-date">{event.date}</span>
          </div>
          <p className="event-description"> <Link style={{textDecoration:"none"}}>Total Task - 230</Link>  <br /> <Link style={{textDecoration:"none"}}>Completed Tasks - 100 </Link> <br /> <Link style={{textDecoration:"none"}}>Pending Tasks - 130</Link> </p>
     
        </div>
      ))}
    </div>
  );
};

export default MyTimeline;

