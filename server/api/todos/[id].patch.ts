export default defineEventHandler(async (event) => {
  // 1. 获取网址里的 ID (比如 /api/todos/1，拿到的就是 '1')
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: '缺少ID' })

  // 2. 获取前端传来的最新状态 { completed: true/false }
  const body = await readBody(event)

  // 3. 让 Prisma 去数据库里更新这条数据
  const updatedTodo = await prisma.todo.update({
    where: { id: Number(id) }, // 数据库的 id 是数字，所以要转换一下
    data: { completed: body.completed }
  })

  return updatedTodo
})