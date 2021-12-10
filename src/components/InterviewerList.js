import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

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
