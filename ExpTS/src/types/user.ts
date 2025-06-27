import { User } from "@prisma/client";

export type CreatedUserDto = Pick<User, "name" | "email" | "majorId">;
export type UpdatedUserDto = Pick<User, "name" | "email" | "majorId">;