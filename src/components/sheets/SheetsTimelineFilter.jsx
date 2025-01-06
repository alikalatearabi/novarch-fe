"use client";
import React, { useState, useEffect } from "react";
import SheetsFilterModal from "./SheetsFilterModal";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SheetsTimelineFilter = ({ events, onFilterChange }) => {
  const parsedEvents = events.map((event) => new Date(event)).sort((a, b) => a - b);
  const [selectedDate, setSelectedDate] = useState(parsedEvents[parsedEvents.length - 1]);

  useEffect(() => {
    onFilterChange(selectedDate);
  }, [selectedDate, onFilterChange]);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    onFilterChange(newDate);
  };

  const handlePrevClick = () => {
    const currentIndex = parsedEvents.findIndex(
      (event) => event.getTime() === selectedDate.getTime()
    );
    if (currentIndex > 0) {
      const newDate = parsedEvents[currentIndex - 1];
      setSelectedDate(newDate);
      onFilterChange(newDate);
    }
  };

  const handleNextClick = () => {
    const currentIndex = parsedEvents.findIndex(
      (event) => event.getTime() === selectedDate.getTime()
    );
    if (currentIndex < parsedEvents.length - 1) {
      const newDate = parsedEvents[currentIndex + 1];
      setSelectedDate(newDate);
      onFilterChange(newDate);
    }
  };

  const btnStyle = "rounded-lg bg-transparent hover:bg-gray-100 border";

  return (
    <div className="flex gap-1 items-center justify-center mb-3">
      <SheetsFilterModal />
      <Button onClick={handlePrevClick} className={btnStyle}>
        <ArrowRight color="black" className="w-4 h-4" />
      </Button>
      <input
        type="date"
        value={selectedDate.toISOString().substr(0, 10)}
        onChange={handleDateChange}
        className="p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
      />
      <Button onClick={handleNextClick} className={btnStyle}>
        <ArrowLeft color="black" className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SheetsTimelineFilter;
