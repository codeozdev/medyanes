"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
const URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddStudent() {
  const [fullname, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const addStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullname || !city || !email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${URL}/api/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, city, email }),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Failed to add topic");
      }
    } catch (error) {
      console.log("Error adding topic: ", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-3 w-1/2 mx-auto justify-center items-center h-screen bg-gray-200"
      onSubmit={addStudent}>
      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
        value={fullname}
      />

      <input
        type="text"
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />

      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <button
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-lg"
        type="submit">
        Add Student
      </button>
    </form>
  );
}
