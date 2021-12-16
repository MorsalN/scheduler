import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const mapInterviewList = props.interviewers.map(item => 
    <InterviewerListItem
      key={item.id}
      // id={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={item.id === props.value}
      setInterviewer={() => props.onChange(item.id)}
    />
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mapInterviewList}
      </ul>
    </section>
  );
}

/* The prop that we are going to validate is interviewers. We will make sure that the interviewers prop is an Array and that it is required.*/

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
