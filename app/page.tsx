import { DataTableDemo } from "@/components/table-content";
const URL = process.env.NEXT_PUBLIC_API_URL;

async function getPosts() {
  const res = await fetch(`${URL}/api/student`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch data");

  return await res.json();
}

export default async function Home() {
  const students = await getPosts();
  const posts = students.posts;

  return (
    <main className="w-1/2 mx-auto">
      <DataTableDemo posts={posts} />
    </main>
  );
}
