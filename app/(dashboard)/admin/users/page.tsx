import { prisma } from "@/lib/db";
import { UsersTable } from "@/components/admin/UsersTable";

// This MUST be the default export
export default async function UsersPage() {
  // Fetch users with their enrollment count from Prisma
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { enrollments: true }, // Replace 'enrollments' with your actual relation name
      },
    },
  });

  // Transform data to match the table's expected format
  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status || "ACTIVE",
    courseCount: user._count?.enrollments || 0,
    createdAt: user.createdAt,
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="px-4">
        <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
        <p className="text-sm text-slate-500">Manage student accounts and monitor course engagement.</p>
      </div>

      {/* The table will handle the "No Data" state internally */}
      <UsersTable data={formattedUsers} />
    </div>
  );
}