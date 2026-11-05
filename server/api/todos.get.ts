export default defineEventHandler(async (event) => {
    // 查出所有待办，按创建时间倒序排列（最新的在上面）
    return await prisma.todo.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })
})