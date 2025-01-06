"use client";
import React, { useState, useEffect } from "react";
import SheetsTimelineFilter from "./SheetsTimelineFilter";
import SheetsTimeline, { YearSelector } from "./SheetsTimeline";
import { useSelector } from "react-redux";

const events = [
  "Sat Jan 05 2024 09:30:00 GMT+0330 (Iran Standard Time)",
  "Sat Jan 05 2023 09:30:00 GMT+0330 (Iran Standard Time)",
  "Tue Jan 23 2024 14:45:00 GMT+0330 (Iran Standard Time)",
  "Fri Feb 14 2024 08:00:00 GMT+0330 (Iran Standard Time)",
  "Sun Mar 17 2024 11:20:00 GMT+0330 (Iran Standard Time)",
  "Fri May 03 2024 17:30:00 GMT+0330 (Iran Standard Time)",
  "Sat Jun 15 2024 19:00:00 GMT+0330 (Iran Standard Time)",
  "Wed Jul 24 2024 07:50:00 GMT+0330 (Iran Standard Time)",
  "Sat Aug 10 2024 13:14:37 GMT+0330 (Iran Standard Time)",
  "Thu Sep 12 2024 16:10:00 GMT+0330 (Iran Standard Time)",
  "Tue Nov 05 2024 20:00:00 GMT+0330 (Iran Standard Time)",
];

const SheetsTimelineRoot = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleFilterChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      {/* <YearSelector onYearChange={handleYearChange} /> */}
      <SheetsTimelineFilter events={events} onFilterChange={handleFilterChange} />
      <SheetsTimeline
        events={events}
        selectedDate={selectedDate}
        onDateSelect={handleFilterChange}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default SheetsTimelineRoot;
