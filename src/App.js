import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import UntilIUnenrollDatepicker from "./UntilIUnenrollDatepicker";
import { useState } from "react";

function App() {
  const estDate = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  const [date, updateDate] = useState(estDate);
  const [unEnrollSelected, updateEnrollSelected] = useState(true);

  const handleDate = (date) => {
    updateDate(date);
  };

  const handleCheckbox = (checkbox) => {
    console.log("the boolean value is ", checkbox);
    updateEnrollSelected(checkbox);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <UntilIUnenrollDatepicker
            initialDate={date}
            unEnrollSelected={unEnrollSelected}
            updateDate={handleDate}
            updateEnrollSelected={handleCheckbox}
          />

          <p>The values are : {date.toString()} </p>
          <p>is selected : {unEnrollSelected.toString()}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
