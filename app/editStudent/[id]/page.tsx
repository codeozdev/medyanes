import EditStudent from "@/components/edit-student";
const URL = process.env.NEXT_PUBLIC_API_URL;

async function getPost(id: any) {
  const res = await fetch(`${URL}/api/student/${id}`, {
    cache: "no-cache",
  });
  return res.json();
}

export default async function EditStudentPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const student = await getPost(id);

  return (
    <div className="text-black text-center">
      <EditStudent student={student} />
      <h1>{id}</h1>
    </div>
  );
}
