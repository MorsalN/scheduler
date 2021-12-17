import { useState, useEffect } from "react";
import "components/Application.scss";

import axios from "axios";


export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {}
  });

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
    });
  }, []);

  /* BOOKING INTERVIEW where state.appointments.interview is null and replacing with obj */

  function bookInterview(id, interview, isEdit) {
    console.log('id', id);
    console.log('interview', interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let days = state.days;

    if (!isEdit) {
      days = updateSpots("bookInterview");
    }

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => setState({ ...state, appointments, days }))
  }

  /* CANCEL INTERVIEW */

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots();

    return axios
      .delete(`/api/appointments/${id}`)
      // if appointments and days are not passed in, the UI won't automatically update the spots unless you refresh and fetch from database 
      .then((res) => setState({ ...state, appointments, days }))

  }

  /* UPDATE SPOTS based on if adding appointment (spots -1 ) or cancelling appointments (spots + 1) */
  const updateSpots = function (requestType) {

    // mapping through the days for get a specific day
    const days = state.days.map(day => {

      // if mapped day name = to the state day
      if (day.name === state.day) {

        // if client wants to book an interview appointment
        if (requestType === "bookInterview") {
          return { ...day, spots: day.spots - 1 }
        } else {

          // if client wants to cancel an interview appointment
          return { ...day, spots: day.spots + 1 }
        }
      } else {

        // if neither, just return the day with no updated spots
        return { ...day }
      }
    })

    // return the mapped days array
    return days;
  };

  return { state, setDay, bookInterview, cancelInterview };
}


