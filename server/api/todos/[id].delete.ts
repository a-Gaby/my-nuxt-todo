export default defineEventHandler(async (event) => {
  // 1. 获取网址里的 ID
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: '缺少ID' })

  // 2. 让 Prisma 删除这条数据
  await prisma.todo.delete({
    where: { id: Number(id) }
  })

  // 3. 返回成功提示
  return { success: true, message: '删除成功' }
})