import { Portion } from "../models";
//npx prisma generate
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import DalInterface from "../utils/DalInterface";

export class PortionDal implements DalInterface<Portion> {
    async getAll(): Promise<Portion[]> {
        try {
            const result = await prisma.portion.findMany()
            return result
        } catch (err) {
            return []
        } finally {
            await prisma.$disconnect()
        }
    }

    async getById(id: number): Promise<Portion | null> {
        try {
            const result = await prisma.portion.findUnique({
                where: { id }
            })
            return result
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async getOne(where: object): Promise<Portion | null> {
        try {
            const result = await prisma.portion.findFirst({
                where
            })
            return result
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async create(data: Portion): Promise<Portion | null> {
        try {
            const material = await prisma.portion.create({
                data
            })
            return material
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async update(id: number, data: Portion): Promise<Portion | null> {
        try {
            const material = await prisma.portion.update({
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
            await prisma.portion.delete({
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