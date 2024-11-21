import { getMonth } from "date-fns";
import { useRef, useState } from "react";
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

  return (
    <DatePicker
      ref={calRef}
      shouldCloseOnSelect={false}
      selected={startDate}
      value={getValueOfDatePicker()}
      onSelect={(date) => setInterimSelection(date)}
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
          prevMonthButtonDisabled={prevMonthButtonDisabled}
          nextMonthButtonDisabled={nextMonthButtonDisabled}
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
