"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { EmployeeType } from "../../Types/Type";

export default function DeleteEmployeePage() {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("http://localhost:5000/employees");

      if (!res.ok) {
        console.error("Failed to fetch employees", res.statusText);
        return;
      }

      const data: EmployeeType[] = await res.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id: string = e.currentTarget.value;

    const confirm: boolean = window.confirm(
      "Are you sure you want to delete this employee with ID:" + id
    );

    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.error("Failed to delete employee", res.statusText);
      return;
    }
    const updatedEmployees = employees.filter(
      (employee) => employee._id !== id
    );
    setEmployees(updatedEmployees);
  };

  if (!employees)
    return (
      <div className="text-center animate-bounce text-3xl">Loading...</div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Delete Employee
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Choose an employee to delete.
        </p>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white">
          <ul className="divide-y divide-slate-200">
            {employees.map((employee) => (
              <li
                key={employee._id}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="truncate text-slate-700">{employee.name}</span>
                <button
                  type="button"
                  value={employee._id}
                  name={employee._id}
                  className="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
