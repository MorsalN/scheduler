import React from "react";

import "components/Button.scss";

import classNames from "classnames";

export default function Button(props) {
   // default is button but if the others are true it will add it ex. button button--confirm
   // using classnames library
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
   
 
   return (
   <button 
   className={buttonClass}
   onClick={props.onClick}
   disabled={props.disabled}
   >
   {props.children}
   </button>
   ); 
 }