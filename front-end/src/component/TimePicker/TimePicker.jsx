import { useState } from "react";

const TimePicker = (props) => {
  const hours = [];
  const minutes = [];

  // Gunakan loop for untuk membuat 24 opsi
  for (let hour = 0; hour <= 24; hour++) {
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    hours.push(
      <option key={formattedHour} value={formattedHour}>
        {formattedHour}
      </option>
    );
  }

  for (let minute = 0; minute < 60; minute++) {
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    minutes.push(
      <option key={formattedMinute} value={formattedMinute}>
        {formattedMinute}
      </option>
    );
  }

  return (
    <>
      <div class="inline-flex border-2 border-slate-400 rounded-lg shadow-lg p-2">
        <select
          name={props.hourName}
          id="hour"
          class="px-2 outline-none appearance-none bg-transparent"
          onChange={props.onChange}
          value={props.hour}
        >
          {hours}
        </select>
        <span class="px-2">:</span>
        <select
          name={props.minuteName}
          id="minute"
          class="px-2 outline-none appearance-none bg-transparent"
          onChange={props.onChange}
          value={props.minute}
        >
          {minutes}
        </select>
      </div>
    </>
  );
};

export default TimePicker;
