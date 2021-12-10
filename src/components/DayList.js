import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const mapDayListItem = props.days.map(item => 
    <DayListItem 
      key={item.id}
      name={item.name}
      spots={item.spots}
      // selected={item.name === props.value}
      selected={item.name === props.day}
      // day={day}
      setDay={props.onChange}
      />
      );
  return(
    <ul>
      {mapDayListItem}  
    </ul>
  )
}

