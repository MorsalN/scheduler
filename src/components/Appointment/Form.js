import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");   
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // Resets Form to empty values
  const reset = function() {
    setStudent("");
    setInterviewer(null);
  }

  // Reset Form and cancels
  const cancel = function() {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList           
        interviewers={props.interviewers}           
        value={interviewer}           
        onChange={setInterviewer}        
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={event => cancel()} >Cancel</Button>
          {/* Called student and interviwer so we can see the output on console. Since those variables are declared in the Form we don't need to call props before ex. props.student. onSave is brought from stories/index.js so we need to call props since it's from outside.*/}
          <Button confirm onClick={props.onSave(student, interviewer)} >Save</Button>
        </section>
      </section>
    </main>
  );
}
