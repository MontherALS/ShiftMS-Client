"use client";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";

function toDate(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function getCurrentAndNext(shifts) {
  const now = new Date();

  for (let i = 0; i < shifts.length; i++) {
    const start = toDate(shifts[i].start);
    const end = toDate(shifts[i].end);

    if (now >= start && now < end) {
      return { current: shifts[i], next: shifts[i + 1] || null };
    }
  }
  return { current: null, next: shifts[0] || null };
}

export default function Shifts({ shifts }) {
  const [current, setCurrent] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    const { current, next } = getCurrentAndNext(shifts);
    setCurrent(current);
    setNext(next);
  }, [shifts]);

  if (!current) return <div>No shift right now</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3>Current Shift — {current.group}</h3>
      <Countdown
        date={toDate(current.end)}
        onComplete={() => {
          setCurrent(next);
          // جهّز اللي بعده
          const idx = shifts.findIndex((s) => s.group === next?.group);
          setNext(shifts[idx + 1] || null);
        }}
        renderer={({ hours, minutes, seconds }) => (
          <span>
            {hours}h {minutes}m {seconds}s
          </span>
        )}
      />

      {next && (
        <div className="mt-2 text-gray-600">
          Next: {next.group} ({next.start} → {next.end})
        </div>
      )}
    </div>
  );
}
