export function filterShiftsByDay(shifts, today) {
  const filteredShifts = shifts.filter((s) => s.workingDays.includes(today));
  return filteredShifts;
}

//
function normalizeShift(shift) {
  const start = toToday(shift.shiftStart);
  const end = toToday(shift.shiftEnd);

  if (end < start) end.setDate(end.getDate() + 1); //overnight
  return { ...shift, _start: start, _end: end };
}

function toToday(hhmm) {
  const [hours, minutes] = hhmm.split(":").map(Number);
  const today = new Date();
  today.setHours(hours, minutes, 0, 0);
  return today;
}

export function getCurrentAndNextShift(shifts, now) {
  const sortedShifts = (Array.isArray(shifts) ? shifts : [])
    .map((s) => normalizeShift(s))
    .sort((a, b) => a._start - b._start); //N

  const currentShifts = sortedShifts.filter(
    (e) => now >= e._start && now < e._end
  );

  let nextShifts;
  console.log(currentShifts);
  if (currentShifts.length > 0) {
    nextShifts = sortedShifts.filter(
      (s) => s._start >= now && !currentShifts.includes(s)
    ); //N
  } else {
    nextShifts = sortedShifts.filter((s) => s._start > now);
  }

  return { current: currentShifts, next: nextShifts };
}
