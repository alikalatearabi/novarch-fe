"use client";
import React, { useState, useEffect, Fragment } from "react";
import moment from "jalali-moment";

export const YearSelector = ({ onYearChange }) => {
  const currentYear = moment().jYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectedYear(newYear);
    onYearChange(newYear);
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <label htmlFor="year" className="mr-2">
        Select Year:
      </label>
      <input
        type="number"
        id="year"
        value={selectedYear}
        onChange={handleYearChange}
        className="p-2 border rounded"
        min="1300"
        max="1500"
      />
    </div>
  );
};

const getDates = (year, events) => {
  const months = [];

  // Format the events array dates to YYYY-MM-DD (Gregorian format)
  const formattedEvents = events.map((event) => {
    const cleanedDate = event.replace("-//", ""); // Clean the date string if needed
    return moment(cleanedDate).format("YYYY-MM-DD");
  });

  // Parse event dates to Jalali dates, ensuring correct locale and format
  const eventDates = events.map((event) => {
    // Remove "-//" and parse the date
    const cleanedDate = event.replace("-//", "");
    return moment(cleanedDate, "YYYY-MM-DD").locale("fa").startOf("day");
  });

  for (let month = 0; month < 12; month++) {
    // Create the start date for the current month in Jalali
    const startDate = moment(`${year}/${month + 1}/1`, "jYYYY/jM/jD").locale("fa");
    const monthName = startDate.format("jMMM");

    const days = [];
    const totalDays = startDate.jDaysInMonth();

    days.push({ day: monthName, show: true, hasEvent: false });

    for (let day = 1; day <= totalDays; day++) {
      const currentDate = moment(`${year}/${month + 1}/${day}`, "jYYYY/jM/jD")
        .locale("fa")
        .startOf("day")
        .format("YYYY-MM-DD"); // Format to match the formattedEvents array

      // Check if the current date matches any of the formatted events
      const hasEvent = formattedEvents.includes(currentDate);

      const show = day % 5 === 1 && day !== 1 && day !== 31;
      days.push({ day, show, hasEvent });
    }

    months.push({ monthName, days });
  }

  return months;
};
const SheetsTimeline = ({ selectedYear, selectedDate, events, onDateSelect }) => {
  const [monthsAndDates, setMonthsAndDates] = useState([]);
  const [candleHover, setCandleHover] = useState(false);
  const [candleIndex, setCandleIndex] = useState(null);

  useEffect(() => {
    setMonthsAndDates(getDates(selectedYear, events));
  }, [selectedYear, events]);

  return (
    <div className="w-full h-[150px] overflow-x-auto overflow-y-hidden scroll-snap-x-mandatory scroll-snap-type-x border flex items-end relative">
      <div className="flex">
        {monthsAndDates.map((monthData, monthIndex) => (
          <div
            key={monthIndex}
            className="flex gap-10 px-4 bg-gray-100 border-gray-300 rounded scroll-snap-start"
          >
            <div className="flex flex-nowrap ">
              {monthData.days.map((dayData, dayIndex) => {
                // const isSelected =
                //   selectedDate.jDate() === dayData.day && selectedDate.jMonth() === monthIndex;

                return (
                  <div
                    key={dayIndex}
                    className={`inline-block text-center rounded mr-2 ${
                      false ? "border-dotted border-2 border-black" : ""
                    }`}
                    onClick={() => {
                      if (dayData.hasEvent) {
                        const newSelectedDate = moment(
                          `${selectedYear}/${monthIndex + 1}/${dayData.day}`,
                          "jYYYY/jM/jD"
                        );
                        onDateSelect(newSelectedDate);
                      }
                    }}
                  >
                    {dayData.show && (
                      <div className="border-b border-black rotate-90 mb-1 w-2 p-1"></div>
                    )}
                    <div className="w-4">{dayData.show && dayData.day}</div>
                    {dayData.hasEvent && (
                      <Fragment>
                        <div
                          onMouseEnter={() => {
                            setCandleHover(true);
                            setCandleIndex(dayIndex);
                          }}
                          onMouseLeave={() => {
                            setCandleHover(false);
                            setCandleIndex(null);
                          }}
                          id="candles"
                          className={`w-2 h-[105px] absolute top-0 cursor-pointer bg-green-200 hover:border hover:border-dashed border-black ${
                            candleHover && candleIndex === dayIndex
                              ? "border-dotted border-2 border-black"
                              : ""
                          } `}
                        ></div>
                        {candleHover && candleIndex === dayIndex && (
                          <div className="absolute top-0 z-0 border p-2">{dayData.day}</div>
                        )}
                      </Fragment>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SheetsTimeline;
