import { PrismaClient } from '@prisma/client'

// 实例化 Prisma 客户端
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // 从数据库查询所有用户
    const users = await prisma.user.findMany()
    return users
})