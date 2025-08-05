const dummyEmployees = [
  {
    id: 1,
    name: "Saud Alamri",
    phone: "+966552234168",
    position: "Electrician",
    avatar: "/api/placeholder/120/120",
  },
  {
    id: 2,
    name: "Ibrahim Saad",
    phone: "+966538210345",
    position: "Technician",
    avatar: "/api/placeholder/120/120",
  },
  {
    id: 3,
    name: "Mohammed Otaibi",
    phone: "+966540197332",
    position: "Electrician",
    avatar: "/api/placeholder/120/120",
  },
  {
    id: 4,
    name: "Noura Saleh",
    phone: "+966551603487",
    position: "Technician",
    avatar: "/api/placeholder/120/120",
  },
];

const dummyGroups = [
  {
    id: "group-a-1",
    name: "Group A",
    admin: "Ahmed",
    schedule: {
      sat: null,
      sun: null,
      mon: { start: "09:00", end: "17:00" },
      tue: { start: "09:00", end: "17:00" },
      wed: { start: "09:00", end: "17:00" },
      thu: { start: "09:00", end: "13:00" },
      fri: null,
    },
    employees: [],
  },
  {
    id: "group-b-1",
    name: "Morning Shift B",
    admin: "Sarah",
    schedule: {
      sat: { start: "07:00", end: "15:00" },
      sun: { start: "07:00", end: "15:00" },
      mon: { start: "07:00", end: "15:00" },
      tue: { start: "07:00", end: "15:00" },
      wed: { start: "07:00", end: "15:00" },
      thu: { start: "07:00", end: "15:00" },
      fri: null,
    },
    employees: [],
  },
  {
    id: "group-c-1",
    name: "Afternoon Shift",
    admin: "Yousef",
    schedule: {
      sat: null,
      sun: { start: "14:00", end: "22:00" },
      mon: { start: "14:00", end: "22:00" },
      tue: { start: "14:00", end: "22:00" },
      wed: { start: "14:00", end: "22:00" },
      thu: { start: "14:00", end: "22:00" },
      fri: null,
    },
    employees: [],
  },
];

module.exports = {
  dummyEmployees,
  dummyGroups,
};
