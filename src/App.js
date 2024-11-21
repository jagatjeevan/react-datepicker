import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import UntilIUnenrollDatepicker from "./UntilIUnenrollDatepicker";

function App() {
  const [date, updateDate] = useState(new Date());
  const [unEnrollSelected, updateEnrollSelected] = useState(true);

  const handleDate = (date) => {
    console.log("Date changed is ", date);
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
