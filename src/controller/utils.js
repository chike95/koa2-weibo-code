/**
 * @description utils controller
 * @author 夜枫林
 */

const fse = require('fs-extra')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const path = require('path')

// 存储目录 -src同级别
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件大小
 */
async function saveFile({ name, type, size, filePath }) {
    console.log('saveFile', name, type, size, filePath);
    // 文件过大
    if (size > MIX_SIZE) {
        // 删除文件
        await fse.remove(filePath)
        // 返回提示信息
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 保存：移动文件
    const fileName = Date.now() + '.' + name // 文件名(防止重名)
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
    await fse.move(filePath, distFilePath) // 移动

    //返回信息 /study.png
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}