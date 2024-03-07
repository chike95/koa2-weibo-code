/**
 * @description 首页　API　路由
 * @author 夜枫林
 */

const router = require('koa-router')()
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')

// 创建微博
router.post('/create', async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    // controller
    ctx.body = await create({ userId, content, image })
})

module.exports = router