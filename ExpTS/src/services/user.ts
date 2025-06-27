import { PrismaClient, User } from "@prisma/client";
import { CreatedUserDto, UpdatedUserDto } from "../types/user";

const prisma = new PrismaClient();  

// get all users
export const getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany({
        include: {
            major: true // Include the related major data
        }
    });
}
// create a new user
export const createUser = async (newUser: CreatedUserDto): Promise<User> => {
    return await prisma.user.create({ data: newUser });
}

// get user by id
export const getUserById = async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: { id },
        include: {
            major: true // Include the related major data
        }
    });
}

// update user
export const updateUser = async (
    id: string,
    updatedUser: UpdatedUserDto
): Promise<User> => {
    return await prisma.user.update({
        where: { id },
        data: updatedUser
    });
}

// delete user
export const deleteUser = async (id: string): Promise<User> => {
    return await prisma.user.delete({ where: { id } });
}   