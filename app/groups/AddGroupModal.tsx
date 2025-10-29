"use client";
import React from "react";
import { useState, useEffect } from "react";
import { EmployeeType } from "../Types/Type";
import { authFetch } from "../../lib/authFetch";
type AddGroupModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
type GroupFormType = {
  name: string;
  workingDays: string[];
  shiftStart: string;
  shiftEnd: string;
  supervisor: string;
};

export default function AddGroupModal({ isOpen, onClose }: AddGroupModalProps) {
  //State's
  const [groupForm, setGroupForm] = useState<GroupFormType>({
    name: "",
    workingDays: [],
    shiftStart: "",
    shiftEnd: "",
    supervisor: "",
  });
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const getEmployees = async () => {
      const res = await authFetch("http://localhost:5000/employees");

      if (!res) return console.log("Cant fetch employees");

      const data: EmployeeType[] = await res.json();

      setEmployees(data);
    };
    getEmployees();
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const updatedDays = checked
      ? [...groupForm.workingDays, value]
      : groupForm.workingDays.filter((day) => day !== value);

    setGroupForm({
      ...groupForm,
      workingDays: updatedDays,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setGroupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await authFetch("http://localhost:5000/groups", {
      method: "POST",

      body: JSON.stringify(groupForm),
    });

    if (res?.status === 400) {
      const data = await res.json();

      setMessage(data.errors[0].msg);

      return;
    }
    if (!res) {
      console.log("Failed to submit group form");
      return;
    }

    setGroupForm({
      name: "",
      workingDays: [],
      shiftStart: "",
      shiftEnd: "",
      supervisor: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity- z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-black ">
          Add New Group
        </h2>
        <span className="text-xl text-red-800">{message}</span>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Group Name</label>
            <input
              type="text"
              name="name"
              value={groupForm.name}
              onChange={handleChange}
              placeholder="e.g. Morning Shift A"
              className="w-full border text-gray-500 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Supervisor</label>
            <select
              name="supervisor"
              onChange={handleChange}
              className="w-full border text-gray-500 rounded px-3 py-2"
            >
              <option value="">Select Supervisor</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} - {employee.phone}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Working Days</label>
            <div className="flex flex-wrap gap-2">
              {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <label key={day} className="inline-flex items-center">
                  <input
                    onChange={handleCheckboxChange}
                    value={day}
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <h1 className="text-xl text-black mt-5">Working houres</h1>
          <div>
            <label className="block text-gray-700 mb-1">From</label>

            <input
              type="time"
              value={groupForm.shiftStart}
              name="shiftStart"
              onChange={handleChange}
              className="w-full border text-gray-500  rounded px-3 py-2"
            />
            <label className="block mt-2 text-gray-700 mb-1">To</label>

            <input
              type="time"
              value={groupForm.shiftEnd}
              name="shiftEnd"
              onChange={handleChange}
              className="w-full border text-gray-500  rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-800 hover:scale-105 duration-500 cursor-pointer "
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={() => console.log(groupForm)}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:scale-105 duration-500 cursor-pointer"
            >
              Save Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
