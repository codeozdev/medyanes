"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
const URL = process.env.NEXT_PUBLIC_API_URL;

interface StudentProps {
  student: {
    id: string;
    fullname: string;
    city: string;
    email: string;
  };
}

export default function EditStudent({ student }: StudentProps) {
  const [newFullName, setNewFullName] = useState(student.fullname);
  const [newCity, setNewCity] = useState(student.city);
  const [newEmail, setNewEmail] = useState(student.email);

  const router = useRouter();

  const updateStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newFullName || !newCity || !newEmail) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${URL}/api/student/${student.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newFullName, newCity, newEmail }),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Basarisiz Guncelleme");
      }
    } catch (error) {
      console.log("Patch fonksiyon hata: ", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-3 w-1/2 mx-auto justify-center items-center h-screen bg-gray-200"
      onSubmit={updateStudent}>
      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setNewFullName(e.target.value)}
        value={newFullName}
      />

      <input
        type="text"
        placeholder="City"
        onChange={(e) => setNewCity(e.target.value)}
        value={newCity}
      />

      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setNewEmail(e.target.value)}
        value={newEmail}
      />

      <button
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-lg"
        type="submit">
        Update Student
      </button>
    </form>
  );
}
