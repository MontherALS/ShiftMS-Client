"use client";

import React from "react";
import NavBar from "../../components/NavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  GroupWithObjects,
  AddEmployeeFormData,
  EmployeeType,
} from "../../Types/Type";
export default function AddEmployeePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<AddEmployeeFormData>({
    _id: "",
    name: "",
    phone: "",
    email: "",
    groupId: "",
  });
  const [groups, setGroups] = useState<GroupWithObjects[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`http://localhost:5000/groups`);
        if (!res.ok) {
          const errorData = await res.json();
          setMessage(errorData.message);
          return;
        }
        const data: GroupWithObjects[] = await res.json();
        setGroups(data);
        console.log("Fetched groups:", data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const errorData: { message: string } = await res.json();

      setMessage(errorData.message);
      return;
    }
    const data: EmployeeType = await res.json();
    console.log("Employee added:", data);
    router.push("/dashboard");
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <NavBar />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Employee
        </h1>
        <span className="text-red-500">{message}</span>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name || ""}
              onChange={handleChange}
              name="name"
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter a name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.phone || ""}
              onChange={handleChange}
              name="phone"
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+966xxxxxxxxx"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email || ""}
              onChange={handleChange}
              name="email"
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Group
            </label>
            <select
              id="group"
              onChange={handleChange}
              name="group"
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Add Employee
            </button>
          </div>

          <div>
            <button
              type="button"
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
            >
              <Link href="/manage-employees">Cancel</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
