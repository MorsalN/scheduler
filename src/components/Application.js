import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import { classBody } from "@babel/types";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application(props) {
  const setDay = (day) => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {}
  });

  console.log('states:', state);

  /* 
  Use axios to make a request as a side effect and update the component when data is retrieved. When a component does not have any dependencies, but we only want it to run once, we have to pass useEffect an empty array.
  */

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,

      }));
      // console.log('all[2].data', all[2].data)
    });
  }, []);


 /* Import the getAppointmentsForDay selector and use it to to return an array of Appointment objects */

  // const dailyAppointments = getAppointmentsForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    // console.log('appointment1233', appointment);
    
    let interview = getInterview(state, appointment.interview);
    
    // if (state.day === 'Friday') {
    //   console.log('state.day', state.day)
    //   console.log('dailyAppointments', dailyAppointments)
    //   console.log("interview",interview)
    //   console.log("appointment.interview",appointment.interview);
    // }
    // if ((Object.keys(interview).length > 0)) {
      if (interview) {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
        // {...appointment} 
        />
      )
    }
  });

  console.log('schedule:', schedule);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}
