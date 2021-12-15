import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import { getInterviewersForDay } from "helpers/selectors";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const [error, setError] = useState("");


  // All the modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Object that controls the mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  /* Transitioning to different mode when using onAdd */
  const transitionCreate = function () {
    transition(CREATE);
  }

  const transitionEmpty = function () {
    transition(EMPTY);
  }

  const transitionShow = function () {
    transition(SHOW);
  }

  const transitionSaving = function () {
    transition(SAVING);
  }

  const transitionDeleting = function () {
    transition(DELETING, true);
  }

  const transitionEdit = function () {
    transition(EDIT);
  }

  const transitionConfirm = function () {
    transition(CONFIRM);
  }

  /* Saving an Appointment */
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transitionSaving();

    props.bookInterview(props.id, interview)
      .then(() => transitionShow())
      .catch(error => {
        console.log('error save = ', error.message)
        transition(ERROR_SAVE, true)
      })

  }

  function remove() {
    if (mode === SHOW) {
      transitionConfirm()
    } else {
      transitionDeleting();
      props.cancelInterview(props.id)
        .then(() => transitionEmpty())
        .catch(error => transition(ERROR_DELETE, true));
    }
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
          onEdit={transitionEdit}
          onDelete={remove}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          error={error}
          setError={setError}
        />)}

      {mode === SAVING && (
        <Status message="Saving" />
      )}

      {mode === DELETING && (
        <Status message="Deleting" />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={remove}
          onCancel={transitionShow}
        />
      )}

      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          onCancel={transitionShow}
          onSave={save}
          interviewer={props.interview.interviewer}
          student={props.interview.student}
          error={error}
        />
      }

      {mode === ERROR_SAVE &&
        <Error message="Could not save this appointment" onClose={back} />
      }

      {mode === ERROR_DELETE &&
        <Error message="Could not delete this appointment" onClose={back} />
      }

    </article>
  );
}

// Header displays the time for the appointment
// Empty allows a user to choose which time slot to book
// Show allows a user to see an existing appointment
// Confirm allows a user to confirm a destructive action
// Status informs the user that an operation is in progress
// Error informs the user when an error occurs
