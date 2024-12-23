import React, { useState, useEffect } from "react";

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

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface DatePickerProps {
  name?: string;
  value: string;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // Get the number of days in a month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate the dates for the calendar grid
  const generateCalendarDates = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);

    const days: (number | null)[] = Array(firstDay).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDateClick = (date: number) => {
    if (date) {
      const newDate = new Date(selectedYear, selectedMonth, date);
      setSelectedDate(newDate);
      onChange(newDate.toISOString());
      setShowCalendar(false);
    }
  };

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const calendarElement = document.getElementById("calendar");
    const inputElement = document.getElementById("date-input");
    if (
      calendarElement &&
      inputElement &&
      !calendarElement.contains(event.target as Node) &&
      !inputElement.contains(event.target as Node)
    ) {
      setShowCalendar(false); // Close the calendar if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full max-w-xs mx-auto relative">
      {/* Input field to show the selected date */}
      <div className="flex items-center bg-white border hover:ring-2 cursor-pointer border-gray-300 rounded-lg shadow shadow-gray-300 hover:shadow-lg hover:shadow-gray-200 transition-all ">
        <span className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar-days"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
          </svg>
        </span>
        <input
          id="date-input"
          name={name}
          type="text"
          value={
            selectedDate
              ? `${selectedDate.getDate()} ${
                  months[selectedDate.getMonth()]
                } ${selectedDate.getFullYear()}`
              : ""
          }
          onClick={handleInputClick}
          readOnly
          className="p-2  w-full cursor-pointer focus:outline-none rounded-lg"
          placeholder="Select a date"
        />
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div
          id="calendar"
          className="absolute z-10 bg-white shadow-lg p-4 border border-gray-300 rounded-xl mt-2"
          style={{ width: "100%" }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex justify-between w-full items-center">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="p-2 border rounded mr-2"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="p-2 border rounded"
              >
                {[...Array(20)].map((_, index) => {
                  const year = new Date().getFullYear() - 10 + index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Calendar Header with Weekdays */}
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {weekdays.map((weekday) => (
              <div key={weekday} className="font-semibold">
                {weekday}
              </div>
            ))}
          </div>

          {/* Calendar Dates */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {generateCalendarDates().map((date, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg cursor-pointer ${
                  date ? "hover:bg-blue-200" : ""
                } ${
                  date === selectedDate?.getDate() &&
                  selectedMonth === selectedDate?.getMonth() &&
                  selectedYear === selectedDate?.getFullYear()
                    ? "bg-blue-400 text-white"
                    : "bg-white"
                }`}
                onClick={() => handleDateClick(date as number)}
              >
                {date}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
