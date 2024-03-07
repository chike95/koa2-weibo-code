/**
 * @description utils APi 公共路由
 * @author 夜枫林
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    // 调用上传图片的函数
    const file = ctx.req.files['file']
    if (!file) {
        return ctx.body = '上传失败'
    }
    // 保存文件
    const { size, path, name, type } = file
    // controller
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router