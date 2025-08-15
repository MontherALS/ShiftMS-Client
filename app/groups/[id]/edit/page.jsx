"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import AddMembers from "@/app/components/AddMembers";
import EditGroupDetails from "@/app/components/EditGroupDetails";
export default function EditGroupPage() {
  const { id } = useParams();
  const router = useRouter();
  const [group, setGroup] = useState({
    name: "",
    workingDays: [],
    shiftStart: "",
    shiftEnd: "",
    supervisor: "",
    employees: [],
  });
  const [formData, setFormData] = useState({
    name: "",
    workingDays: [],
    shiftStart: "",
    shiftEnd: "",
    supervisor: "",
    employees: [],
  });
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchGroupData = async () => {
      const res = await fetch(`http://localhost:5000/groups/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch group data");
      }
      const data = await res.json();
      console.log("Fetched group data:", data);
      setGroup(data);
      setFormData({
        name: data?.name || "",
        supervisor: data?.supervisor?._id || "",
        shiftStart: data?.shiftStart || "",
        shiftEnd: data?.shiftEnd || "",
        workingDays: Array.isArray(data?.workingDays) ? data.workingDays : [],
        employees: Array.isArray(data?.employees)
          ? data.employees.map((employee) => employee._id)
          : [],
      });
    };
    const fetchedEmployees = async () => {
      const res = await fetch("http://localhost:5000/employees");
      if (!res.ok) return console.error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    };

    fetchedEmployees();
    fetchGroupData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...(prev || {}),
      [name]: value,
    }));
    console.log("Form data updated:", { ...formData, [name]: value });
  }
  function handleCheckboxChange(e) {
    const { checked, value, name } = e.target;
    if (name === "workingDays") {
      const currentDays = Array.isArray(formData.workingDays)
        ? formData.workingDays
        : [];
      const updatedDays = checked
        ? [...currentDays, value]
        : currentDays.filter((day) => day !== value);

      setFormData((prev) => ({
        ...(prev || {}),
        workingDays: updatedDays,
      }));
    } else if (name === "employees") {
      const currentEmployees = Array.isArray(formData.employees)
        ? formData.employees
        : [];
      const updatedEmployees = checked
        ? [...currentEmployees, value]
        : currentEmployees.filter((employee) => employee !== value);

      setFormData((prev) => ({
        ...(prev || {}),
        employees: updatedEmployees,
      }));
    }
    console.log(formData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch(`http://localhost:5000/groups/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.error("Failed to update group");
        return;
      }
      router.push(`/groups/${id}`);
    } catch (error) {
      console.error("Error updating group:", error);
    }
  }
  //Delete group
  const handleDeleteGroup = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (!confirm) return;
    const res = await fetch(`http://localhost:5000/groups/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Group deleted", data.msg);
      router.push("/groups");
    } else {
      console.error("Failed to delete group");
    }
  };
  const handleDeleteMember = async (e) => {
    const ID = e.target.id;
    console.log(ID);
    const alert = window.confirm(
      `Are you sure you want to delete this group member ?`
    );
    if (!alert) return;
    const res = await fetch(
      `http://localhost:5000/groups/${id}/remove-member`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId: ID }),
      }
    );
    if (!res) console.error(`error happend ${err}`);
    router.push(`/groups/${id}`);
  };
  const props = {
    formData,
    employees,
    group,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    handleDeleteGroup,
    handleDeleteMember,
  };
  if (!group) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-50">
        <div
          className="h-10 w-10 rounded-full border-2 border-gray-300 border-t-blue-600 animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <EditGroupDetails {...props} />
      <AddMembers {...props} />
    </main>
  );
}
