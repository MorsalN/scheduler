import React from "react";
import "components/Appointment/styles.scss";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import { getInterviewersForDay } from "helpers/selectors";

export default function Appointment(props) {

  // All the modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // Object that controls the mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  /* Transitioning to different mode when using onAdd */
  const transitionCreate = function() {
    transition(CREATE);
  }

  const transitionEmpty = function() {
    transition(EMPTY);
  }

  const transitionShow = function() {
    transition(SHOW);
  }


  return (
    <article className="appointment">

      <Header time={props.time} />

      {/* Render a component when the mode matches */}
      {mode === EMPTY && <Empty onAdd={transitionCreate} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          // onDelete={props.onDelete}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          // onSave={save}

        />)}

    </article>
  );
}

// Header displays the time for the appointment
// Empty allows a user to choose which time slot to book
// Show allows a user to see an existing appointment
// Confirm allows a user to confirm a destructive action
// Status informs the user that an operation is in progress
// Error informs the user when an error occurs


// {
//   props.interview ? (
//     <Show
//       student={props.interview.student}
//       interviewer={props.interview.interviewer}
//       onEdit={props.onEdit}
//       onDelete={props.onDelete}
//       id={props.id}
//       time={props.time}
//       interview={props.interview}
//     />
//   ) : (
//     <Empty />
//   )
// }