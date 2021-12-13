import React from "react";
import "components/Appointment/styles.scss";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  return (
    <article className="appointment">
      {/* {props.time ? <h3>Appointment at {props.time}</h3> : <h3>No Appointments</h3>} */}
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          id={props.id}
          time={props.time}
          interview={props.interview}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}

// Header displays the time for the appointment
// Empty allows a user to choose which time slot to book
// Show allows a user to see an existing appointment
// Confirm allows a user to confirm a destructive action
// Status informs the user that an operation is in progress
// Error informs the user when an error occurs
