"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AddMembers from "./AddMembers";
import EditGroupDetails from "./EditGroupDetails";
import {
  GroupWithIds,
  GroupWithObjects,
  EmployeeType,
} from "../../../Types/Type";

export default function EditGroupPage() {
  const { id } = useParams();
  const router = useRouter();

  // group الحقيقي من السيرفر (كائنات كاملة)
  const [group, setGroup] = useState<GroupWithObjects | null>(null);

  // البيانات المعدلة بالفورم (IDs فقط)
  const [formData, setFormData] = useState<GroupWithIds>({
    name: "",
    workingDays: [],
    shiftStart: "",
    shiftEnd: "",
    supervisor: "",
    employees: [],
  });

  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // جلب بيانات المجموعة
    const fetchGroupData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/groups/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          setMessage(errorData.message);
          return;
        }

        const data: GroupWithObjects = await res.json();

        // خزّن البيانات الأصلية
        setGroup(data);

        // حولها للفورم (IDs فقط)
        setFormData({
          name: data.name || "",
          workingDays: Array.isArray(data.workingDays) ? data.workingDays : [],
          shiftStart: data.shiftStart || "",
          shiftEnd: data.shiftEnd || "",
          supervisor: data.supervisor?._id || "",
          employees: Array.isArray(data.employees)
            ? data.employees.map((emp) => emp._id)
            : [],
        });
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    // جلب قائمة الموظفين
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5000/employees");
        if (!res.ok) {
          const errorData = await res.json();
          setMessage(errorData.message);
          return;
        }

        const data: EmployeeType[] = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
    fetchGroupData();
  }, [id]);

  // تحديث الحقول العادية
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // تحديث الـ checkbox
  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value, name } = e.target;

    if (name === "workingDays") {
      const updatedDays = checked
        ? [...formData.workingDays, value]
        : formData.workingDays.filter((day) => day !== value);

      setFormData((prev) => ({
        ...prev,
        workingDays: updatedDays,
      }));
    } else if (name === "employees") {
      const updatedEmployees = checked
        ? [...formData.employees, value]
        : formData.employees.filter((emp) => emp !== value);

      setFormData((prev) => ({
        ...prev,
        employees: updatedEmployees,
      }));
    }
  }

  // إرسال الفورم (تحديث المجموعة)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/groups/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message);
        return;
      }

      router.push(`/groups/${id}`);
    } catch (error) {
      console.error("Error updating group:", error);
    }
  }

  // حذف المجموعة
  const handleDeleteGroup = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/groups/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message);
        return;
      }

      router.push("/groups");
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  // التجهيز لتمرير الـ props
  const props = {
    formData,
    employees,
    group,
    message,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    handleDeleteGroup,
  };

  // شاشة تحميل
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
