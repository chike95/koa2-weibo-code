const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log(ctx.session.userInfo);
  await ctx.render('index2', {
    userInfo: ctx.session.userInfo
  })
})


router.get('/json', async (ctx, next) => {
  // throw Error('something error');
  const session = ctx.session
  if (session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++

  console.log(session.viewNum)

  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params;
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    title: 'this is loadMore page',
    userName,
    pageIndex
  }
})

module.exports = router
