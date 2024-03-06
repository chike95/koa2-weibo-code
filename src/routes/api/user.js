/**
 * @description user APi 路由
 * @author 夜枫林
 */

const router = require('koa-router')()
const { isExist, register, login, changeInfo } = require('../../controller/user')
const { loginCheck } = require('../../middlewares/loginChecks')

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

// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    // controller
    ctx.body = await login(ctx, userName, password)
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, async (ctx, next) => {
    // 获取参数
    const { nickName, city, picture } = ctx.request.body
    // controller
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

module.exports = router