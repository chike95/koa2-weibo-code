/**
 * @description user APi 路由
 * @author 夜枫林
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')

router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    // 调用 controller，返回
    ctx.body = await register({ userName, password, gender })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    // 返回数据
    ctx.body = await isExist(userName)
})

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    // controller
    console.log("hello------------------------");
    ctx.body = await login(ctx, userName, password)
})
module.exports = router