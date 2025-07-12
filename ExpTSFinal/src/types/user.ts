import { User } from "@prisma/client";

export type CreatedUserDto = Pick<User, "name" | "email" | "majorId" | "password">;
export type UpdatedUserDto = Pick<User, "name" | "email" | "majorId">;