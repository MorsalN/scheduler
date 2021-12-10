import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // const formatSpots = () => {
  //   {props.spots === 0 && <h3>no spots remaining</h3>}
  //   {props.spots === 1 && <h3>1 spot remaining</h3>}
  //   {props.spots && <h3>{props.spots} spots remaining</h3>} 
  // }

  return (
    // <li> represents the entire day item
    <li onClick={() => props.setDay(props.name)} className={dayClass} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      {/* <h3 className="text--light">{formatSpots}</h3> */}

      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">1 spot remaining</h3>}
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>} 


    </li>
  );
}
