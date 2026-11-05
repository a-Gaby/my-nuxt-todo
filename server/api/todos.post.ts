export default defineEventHandler(async (event) => {
  // 读取前端发过来的请求体（body）
  const body = await readBody(event)
  
  if (!body.title) {
    throw createError({ statusCode: 400, statusMessage: '标题不能为空' })
  }

  // 往数据库插入一条数据
  const newTodo = await prisma.todo.create({
    data: {
      title: body.title
    }
  })
  
  return newTodo
})