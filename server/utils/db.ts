import { PrismaClient } from '@prisma/client'

// 防止开发环境热更新时，创建太多数据库连接
// 1. 造一个函数，用来创建 Prisma 实例（也就是连数据库的通道）
const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// 2. 强行用 TypeScript 定义一个全局变量的类型（这行纯属为了写代码有提示，不管它）
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

// 导出 prisma 实例
// 3. 核心逻辑：全局有连接，就用全局的；全局没有，才新建一个
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// 4. 如果是在开发环境，把新建的实例塞进全局变量里，这样下次热更新就能直接复用。
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}