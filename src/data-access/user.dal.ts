import { User } from "../models";
//npx prisma generate
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class UserDal {
    async getUnique(where: object, select = null): Promise<User | null> {
        try {
            const result = await prisma.user.findUnique({
                where,
                select
            })
            return result as User | null
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async getOne(where: object, select = null): Promise<User | null> {
        try {
            const result = await prisma.user.findFirst({
                where,
                select
            })
            return result as User | null
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async getMany(where: object = {}, select = null, orderBy: object = {}): Promise<User[]> {
        try {
            const result = await prisma.user.findMany({
                where,
                select,
                orderBy
            })
            return result as User[]
        } catch (err) {
            return []
        } finally {
            await prisma.$disconnect()
        }
    }

    async create(data: User): Promise<User | null> {
        try {
            const user = await prisma.user.create({
                data
            })
            return user
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }

    async update(id: number, data: User): Promise<User | null> {
        try {
            const user = await prisma.user.update({
                where: {
                    id
                },
                data
            })
            return user
        } catch (err) {
            return null
        } finally {
            await prisma.$disconnect()
        }
    }
}