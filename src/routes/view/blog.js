/**
 * @description 博客 view 路由
 * @author 夜枫林
 */

const router = require('koa-router')()

// 首页
router.get('/', async (ctx) => {
    await ctx.render('index2', {})
})

module.exports = router