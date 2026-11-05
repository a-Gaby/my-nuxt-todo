export default defineEventHandler(async (event) => {
  return {
    ok: true,
    message: '后端接口跑通了！',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }
})