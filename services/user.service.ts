import { db } from "@/lib/db"; // Adjust based on your prisma client location

export const getAllUsers = async () => {
  return await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const updateUserRole = async (userId: string, role: "ADMIN" | "INSTRUCTOR" | "STUDENT") => {
  return await db.user.update({
    where: { id: userId },
    data: { role },
  });
};