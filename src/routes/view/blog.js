/**
 * @description 博客 view 路由
 * @author 夜枫林
 */

const router = require('koa-router')()
// const { loginRedirect } = require('../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')

// 首页
router.get('/', async (ctx) => {
    await ctx.render('index2', {})
})

// 个人主页
router.get('/profile', async (ctx) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect('/profile/${userName}',)
})

router.get('/profile/:userName', async (ctx) => {
    const { userName: curUserName } = ctx.params
    // 获取微博第一页数据
    // controller
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageIndex, pageSize, count } = result.data
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count
        }
    })
})

module.exports = router