import { Material } from "../models";
//npx prisma generate
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import DalInterface from "../utils/DalInterface";

export class MaterialDal implements DalInterface<Material> {
    async getAll(): Promise<Material[]> {
        try {
            const result = await prisma.material.findMany()
            return result
        } catch (err) {
            return []
        } finally {
            await prisma.$disconnect()
        }
    }

    async getById(id: number): Promise<Material | null> {
        try {
            const result = await prisma.material.findUnique({
                where: { id }
            })
            return result
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async getOne(where: object): Promise<Material | null> {
        try {
            const result = await prisma.material.findFirst({
                where
            })
            return result
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async create(data: Material): Promise<Material | null> {
        try {
            const material = await prisma.material.create({
                data
            })
            return material
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async update(id: number, data: Material): Promise<Material | null> {
        try {
            const material = await prisma.material.update({
                where: { id },
                data
            })
            return material
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            await prisma.material.delete({
                where: {
                    id
                }
            })
            return true
        } catch (err) {
            return false
        } finally {
            await prisma.$disconnect()
        }
    }

}