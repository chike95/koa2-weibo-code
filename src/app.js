const Koa = require('koa')
const path = require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')

const { isProd, isTest } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 路由
const index = require('./routes/index')
const utilsApiRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const blogViewRouter = require('./routes/view/blog')
const errorViewRouter = require('./routes/view/error')

// error handle
let onerrorConf = {}
if (isProd) {
  onerrorConf.redirect = '/error'
}
onerror(app, onerrorConf)



// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', '/uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


// 3-5 session 配置
app.keys = [SESSION_SECRET_KEY]; // 设置session的密钥，用于加密session数据。
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
// app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册到最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
