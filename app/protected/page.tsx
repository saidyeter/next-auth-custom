import { getServerSession } from "next-auth";

export default async function ProtectedPage() {
  const session = await getServerSession()

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center">
      <span>protected page</span>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}