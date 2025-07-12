import { PrismaClient, Major } from '@prisma/client'
import { CreateMajorDto } from '../types/major'

const prisma = new PrismaClient()
export const getAllMajors = async(): Promise<Major[]> => {
    return prisma.major.findMany();
}
export const createMajor = async (
    newMajor: CreateMajorDto
): Promise<Major> => {
    return await prisma.major.create({ data: newMajor })
}

export const getMajorById = async (id: string): Promise<Major | null> => {
    return await prisma.major.findUnique({ where: { id } });
}

export const updateMajor = async (
    id: string,
    updatedMajor: CreateMajorDto
): Promise<Major> => {
    return await prisma.major.update({
        where: { id },
        data: updatedMajor
    });
}

export const deleteMajor = async (id: string): Promise<Major> => {
    return await prisma.major.delete({ where: { id } });
}

export const majorByCode = async (code: string): Promise<Major | null> => {
    return await prisma.major.findUnique({ where: { code } });
}