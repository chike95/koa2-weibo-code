/**
 * @description error 404 路由
 * @author 夜枫林
 */

const router = require('koa-router')();

// error
router.get('/error', async (ctx, next) => {
    await ctx.render('error', { title: '微博 - 错误' });
})

// 404
router.get('*', async (ctx, next) => {
    await ctx.render('404', { title: '微博 - 404' });
})


module.exports = router