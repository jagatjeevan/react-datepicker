import { useRef, useState } from "react";

import CalendarIcon from "./Calendar";
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

function ButtonGroup(props) {
  return (
    <div style={{ textAlign: "right" }}>
      <button onClick={props.onCancel}>Cancel</button>
      <button onClick={props.onApply}>Apply</button>
    </div>
  );
}

function UntilIUnenrollBanner(props) {
  const [checked, setChecked] = useState(props.isUnenrollSelected);
  return (
    <>
      <div className="untilIunenroll">
        <input
          type="checkbox"
          name="untillIunenroll"
          onChange={(e) => {
            const value = e.currentTarget.checked;
            setChecked(value);
            props.setInterimUnenrollSelection(value);
          }}
          checked={checked}
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

function UntilIUnenrollDatepicker(props) {
  const calRef = useRef();
  const [startDate, setStartDate] = useState(props.initialDate);
  const [interimSelection, setInterimSelection] = useState(props.initialDate);

  const [isUnenrollSelected, setIsUnenrollSelected] = useState(
    props.unEnrollSelected
  );
  const [interimUnenrollSelection, setInterimUnenrollSelection] = useState(
    props.unEnrollSelected
  );

  const getValueOfDatePicker = () => {
    return isUnenrollSelected ? "Until I unenroll" : startDate;
  };

  const onApply = () => {
    calRef.current.setOpen(false);
    setStartDate(interimSelection);
    setIsUnenrollSelected(interimUnenrollSelection);
    props.updateDate(interimSelection);
    props.updateEnrollSelected(interimUnenrollSelection);
  };

  const onCancel = () => {
    calRef.current.setOpen(false);
    setInterimSelection(props.initialDate);
    setIsUnenrollSelected(props.unEnrollSelected);
  };

  const filterDate = (date) => {
    return !interimUnenrollSelection;
  };

  return (
    <DatePicker
      ref={calRef}
      showIcon
      icon={CalendarIcon}
      shouldCloseOnSelect={false}
      selected={startDate}
      value={getValueOfDatePicker()}
      onSelect={(date) => setInterimSelection(date)}
      filterDate={filterDate}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <UntilIUnenrollBanner
          date={date}
          changeYear={changeYear}
          changeMonth={changeMonth}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
          prevMonthButtonDisabled={
            interimUnenrollSelection ?? prevMonthButtonDisabled
          }
          nextMonthButtonDisabled={
            interimUnenrollSelection ?? nextMonthButtonDisabled
          }
          isUnenrollSelected={isUnenrollSelected}
          setInterimUnenrollSelection={setInterimUnenrollSelection}
        />
      )}
    >
      <ButtonGroup onApply={onApply} onCancel={onCancel} />
    </DatePicker>
  );
}

export default UntilIUnenrollDatepicker;
