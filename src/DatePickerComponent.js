import { getMonth } from "date-fns";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={props.decreaseMonth}
          disabled={props.prevMonthButtonDisabled}
        >
          {"<"}
        </button>
        {months[getMonth(props.date)]}
        <button
          onClick={props.increaseMonth}
          disabled={props.nextMonthButtonDisabled}
        >
          {">"}
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
