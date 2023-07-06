import React from 'react';
import './ProjectCard.css'; // Import your card styling


const ProjectCard = ({ title, description, deadline, status, assignee }) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <h2 className="project-title">Project Title:- {title}</h2>
      </div>
      <div className="project-body">
        <p className="project-description">Project Description :- {description}</p>
        <div className="project-details">
          <p className="project-deadline">Deadline:- {deadline}</p>
          <p className="project-status">Status:- {status}</p>
          <p className="project-assignee">Assignee:-  {assignee}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
