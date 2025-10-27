import { GroupWithObjects } from "../app/Types/Type";

export function filterShiftsByDay(shifts: GroupWithObjects[], today: string) {
  const filteredShifts = shifts.filter((s) => s.workingDays.includes(today));
  return filteredShifts;
}

function normalizeShift(shift: GroupWithObjects) {
  const start = toToday(shift.shiftStart);
  const end = toToday(shift.shiftEnd);

  if (end < start) end.setDate(end.getDate() + 1); //overnight
  return { ...shift, _start: start, _end: end };
}

function toToday(hhmm: string) {
  const [hours, minutes] = hhmm.split(":").map(Number);
  const today = new Date();
  today.setHours(hours, minutes, 0, 0);
  return today;
}

export function getCurrentAndNextShift(shifts: GroupWithObjects[], now: Date) {
  const sortedShifts = (Array.isArray(shifts) ? shifts : [])
    .map((s) => normalizeShift(s))
    .sort((a, b) => {
      const startA = a._start ? a._start.getTime() : 0;
      const startB = b._start ? b._start.getTime() : 0;
      return startA - startB;
    });

  const currentShifts = sortedShifts.filter((e) => {
    if (!e._start || !e._end) return false;
    return now >= e._start && now < e._end;
  });

  let nextShifts: GroupWithObjects[] = [];
  if (currentShifts.length > 0) {
    nextShifts = sortedShifts.filter(
      (s) => s._start >= now && !currentShifts.includes(s)
    );
  } else {
    nextShifts = sortedShifts.filter((s) => s._start > now);
  }

  return { current: currentShifts, next: nextShifts };
}
