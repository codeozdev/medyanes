"use client";

import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";
import { Button } from "./ui/button";

export default function RemoveBtn({ id }: { id: string }) {
  const router = useRouter();

  const handleRemove = async () => {
    try {
      const confirmed = confirm("Are you sure you want to delete this student?");
      if (confirmed) {
        const res = await fetch(`/api/student/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          location.reload();
          console.log("Student Deleted");
        }
      }
    } catch (e) {
      console.log("removeBtn Error", e);
    } finally {
      router.refresh();
    }
  };

  return (
    <Button variant="outline" className="text-red-500" onClick={handleRemove}>
      <HiOutlineTrash className="text-red-600" />
    </Button>
  );
}
