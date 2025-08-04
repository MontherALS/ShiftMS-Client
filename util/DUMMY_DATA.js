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
    name: "Morning Shift A",
    shiftStart: "06:00",
    shiftEnd: "14:00",
    employees: [],
  },
  {
    name: "Morning Shift B",
    shiftStart: "07:00",
    shiftEnd: "15:00",
    employees: [],
  },
  {
    name: "Afternoon Shift",
    shiftStart: "14:00",
    shiftEnd: "22:00",
    employees: [],
  },
];
module.exports = {
  dummyEmployees,
  dummyGroups,
};
