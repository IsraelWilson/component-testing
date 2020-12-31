import React, { useState, useEffect } from "react";
import moment from "moment";

export const Calendar = ({ getDate = () => {} }) => {
  const [currentMonth, setCurrentMonth] = useState(
    moment().format("MMMM YYYY")
  );
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(moment().format("MMMM YYYY")));
  }, []);

  const getNext = () => {
    const now = moment(currentMonth);
    now.add(1, "M");
    setCurrentMonth(now.format("MMMM YYYY"));
    setCalendar(buildCalendar(now.format("MMMM YYYY")));
  };

  const getPrev = () => {
    const now = moment(currentMonth);
    now.subtract(1, "M");
    setCurrentMonth(now.format("MMMM YYYY"));
    setCalendar(buildCalendar(now.format("MMMM YYYY")));
  };

  const buildCalendar = (date) => {
    const newCal = [];
    const now = moment(date);
    const numDays = now.daysInMonth();
    const offset = Math.floor((42 - numDays) / 2);

    // Add offset number of days from the end of last month
    const daysInLastMonth = now.subtract(1, "M").daysInMonth();
    for (let i = daysInLastMonth - offset + 1; i <= daysInLastMonth; i++) {
      newCal.push(i);
    }

    // Add each day for the current month
    for (let i = 1; i <= numDays; i++) {
      newCal.push(i);
    }

    // Add offset number of days for the start of next month
    for (let i = 1; i <= (numDays % 2 === 0 ? offset : offset + 1); i++) {
      newCal.push(i);
    }

    return newCal;
  };

  const buildCalendarCell = (num) => {
    return <span onClick={() => getDate(currentMonth + " " + num)}>{num}</span>;
  };

  const buildCalendarRow = (cells) => {
    return <div>{cells}</div>;
  };

  // Create visual representation of the calendar
  const renderCalendar = () => {
    const newCal = calendar;
    let cells = [];
    const rows = [];

    for (let i = 0; i < newCal.length; i++) {
      if (cells.length % 7 === 0 && i !== 0) {
        rows.push(buildCalendarRow(cells));
        cells = [];
      }
      cells.push(buildCalendarCell(newCal[i]));
    }
    rows.push(buildCalendarRow(cells));

    return rows;
  };

  return (
    <>
      <button onClick={() => getPrev()}>prev</button>
      <span>{currentMonth}</span>
      <button onClick={() => getNext()}>next</button>
      {renderCalendar()}
    </>
  );
};
