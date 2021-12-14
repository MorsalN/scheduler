export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(dayInDays => dayInDays.name === day);

  if (!dayObj) {
    return [];
  }

  let result = [];

  for (const id of dayObj.appointments) {
    const appointmentObj = state.appointments[id];
    result.push(appointmentObj)
  }
  return result;
}


export function getInterview(state, interview) {
  let interviewObj = {};

  if (!state.interviewers || !interview) {
    return null;
  }

  for (const interviewInfo in state.interviewers) {
    const interviewID = state.interviewers[interviewInfo].id;

    if (interviewID === interview.interviewer) {
      interviewObj['student'] = interview.student;
      interviewObj['interviewer'] = state.interviewers[interviewInfo];
    }

  }
  return interviewObj;
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(dayInDays => dayInDays.name === day);

  if (!dayObj || !state.days.length) {
    return [];
  }

  if (!dayObj.interviewers) {
    return [];
  }

  let result = [];

  for (const id of dayObj.interviewers) {
    const interviewerObj = state.interviewers[id];
    result.push(interviewerObj)
  }
  return result;
}
