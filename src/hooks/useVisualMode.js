import { decorateAction } from "@storybook/addon-actions/dist/preview";
import React, {useState} from "react"


/* Setting the Initial Mode */ 

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /* Transition */ 
  function transition(newMode, replace = false) {
    
    if (!replace) {
      //Change history to a copy of the history with newMode at end
      setHistory(prevHistory => [...prevHistory, newMode]);
      
      // Asign mode to new mode
      setMode(newMode);
    }
  }
  
  /* Going back to previous mode */ 
  function back() {
    if (history.length > 1) {
      // To get previous mode 
      setMode(history[history.length - 2])

      //Sets history to a copy of history minus end
      setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));

    }

  }

  


  return { mode, transition, back }; // { mode: mode }
}

