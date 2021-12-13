export function getAppointmentsForDay(state, day) {

  const filteredDay = state.days.filter(dayInDays => dayInDays.name === day)[0];

  // console.log('filteredDay: ', filteredDay);

  if (!filteredDay) {
    return [];
  }

  let result = [];
  for (const id of filteredDay.appointments) {
    // console.log('id: ', id);

    const appointmentObj = state.appointments[id];
    // console.log('appointmentObj: ', appointmentObj)

    result.push(appointmentObj)
  }
  return result;
}


export function getInterview(state, interview) {
  // console.log('state.interviewers:', state.interviewers);
  let interviewObj = {};

  if (!state.interviewers || !interview) {
    return null;
  }

  for (const interviewInfo in state.interviewers) {
    const interviewID = state.interviewers[interviewInfo].id;
    console.log('interviewInfo', state.interviewers[interviewInfo]);
    console.log('interviewID',interviewID)
    console.log('interview.interviewer', interview.interviewer)


    if (interviewID === interview.interviewer) {
      interviewObj['student'] = interview.student
      interviewObj['interviewer'] = state.interviewers[interviewInfo]
    }
  }
  
  // console.log('interviewObj',interviewObj)
  return interviewObj;


}