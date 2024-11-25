import { useEffect, useRef, useState } from "react";

import DatePicker from "react-datepicker";
import { getMonth } from "date-fns";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function CustomHeader(props) {
  const handleChange = (e) => {
    props.handleUnenroll(e.currentTarget.checked);
  };

  return (
    <>
      <div className="untilIunenroll">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={props.isUnenrollSelected}
        />
        Until I unenroll
      </div>
      <div
        style={{
          margin: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          onClick={props.decreaseMonth}
          disabled={props.prevMonthButtonDisabled}
          className="react-datepicker__navigation react-datepicker__navigation--previous"
        >
          <span class="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
            Previous Month
          </span>
        </button>
        <h2 className="react-datepicker__current-month">
          {months[getMonth(props.date)]}
        </h2>

        <button
          type="button"
          onClick={props.increaseMonth}
          disabled={props.nextMonthButtonDisabled}
          className="react-datepicker__navigation react-datepicker__navigation--next"
          aria-label="Next Month"
        >
          <span class="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
            Next Month
          </span>
        </button>
      </div>
    </>
  );
}

function DatePickerComponent(props) {
  const calRef = useRef();
  const [startDate, setStartDate] = useState(props.prevDate);
  const [isUnenrollSelected, setIsUnenrollSelected] = useState(
    props.unEnrollSelected
  );
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);

  useEffect(() => {
    setStartDate(props.prevDate);
  }, [props.prevDate]);

  const min = new Date(2000, 2, 10);
  const max = new Date(2002, 2, 10);

  return (
    <div className="textboxContainer">
      <input
        type="text"
        placeholder="Until i unenroll"
        className="untilIunenrollTextbox"
        onFocus={() => calRef.current.setOpen(true)}
        value={props.unEnrollSelected ? "Untill I unenroll" : props.prevDate}
      />
      <DatePicker
        onCalendarClose={() => {
          props.updateEnrollSelected(
            isConfirmClicked ? isUnenrollSelected : props.unEnrollSelected
          );
          setIsConfirmClicked(false);
        }}
        ref={calRef}
        min={min}
        max={max}
        selected={startDate}
        shouldCloseOnSelect={false}
        onChange={(date) => setStartDate(date)}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <CustomHeader
            handleUnenroll={setIsUnenrollSelected}
            isUnenrollSelected={isUnenrollSelected}
            date={date}
            changeYear={changeYear}
            changeMonth={changeMonth}
            decreaseMonth={decreaseMonth}
            increaseMonth={increaseMonth}
            prevMonthButtonDisabled={prevMonthButtonDisabled}
            nextMonthButtonDisabled={nextMonthButtonDisabled}
          />
        )}
      >
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => {
              setStartDate(props.prevDate);
              setIsUnenrollSelected(props.unEnrollSelected);
              calRef.current.setOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setIsConfirmClicked(true);
              props.updateDate(startDate);
              props.updateEnrollSelected(isUnenrollSelected);
              calRef.current.setOpen(false);
            }}
          >
            Apply
          </button>
        </div>
      </DatePicker>
    </div>
  );
}

export default DatePickerComponent;
