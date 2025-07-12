import { PrismaClient, User } from "@prisma/client";
import { CreatedUserDto, UpdatedUserDto } from "../types/user";
import bcrypt from 'bcryptjs';

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
export const createUser = async (user: CreatedUserDto): Promise<User> => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(user.password, salt);
  console.log('Senha criptografada:', password);
  console.log('Dados do usuário:', user);
  return await prisma.user.create({
    data: { ...user, password }
  });
};

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
    console.log('Dados atualizados do usuário:', updatedUser);
    return await prisma.user.update({
        where: { id },
        data: updatedUser
    });
}

// delete user
export const deleteUser = async (id: string): Promise<User> => {
    return await prisma.user.delete({ where: { id } });
}   

export const updateUserPass = async (id: string, password: string): Promise<User> => {
    const salt = await bcrypt.genSalt(10);
    const p = await bcrypt.hash(password, salt);
    console.log('Senha criptografada para atualização:', password);
    return await prisma.user.update({
        where: { id },
        data: { password: p }
    });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: { email },
        include: {
            major: true
        }
    });
}


export const getScore = async (userId: string): Promise<number> => {
    const sessions = await prisma.game_session.findMany({
        where: { userId },
        orderBy: { score: 'desc' },
        take: 1
    });
    if (sessions.length === 0) {
        return 0;
    }
    const highestScore = sessions[0].score;
    return highestScore
}
