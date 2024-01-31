const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')

// 路由
const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


// 3-5 session 配置
app.keys = ['UIsdf-7878￥@%']; // 设置session的密钥，用于加密session数据。
app.use(session({
  key: 'weibo.sid', // cookie name (default is koa.sid)
  prefix: 'weibo:sess:', // 前缀：cookie prefix (default is empty string)
  cookie: {
    path: '/', // cookie的path (default is '/')
    httpOnly: true, // 是否只允许http访问cookie (default is true)
    maxAge: 24 * 60 * 60 * 1000, // cookie的过期时间 maxAge in ms 
  },
  // ttl: 24 * 60 * 60 * 1000,
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册到最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
