/**
 * @description user controller
 * @author 夜枫林
 */

const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { getUserInfo } = require("../services/user")
const {
    registerUserNameNotExistInfo
} = require('../model/ErrorInfo')

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    // 业务逻辑处理
    const userInfo = await getUserInfo(userName)

    if (userInfo) {
        // 已存在
        return new SuccessModel(userInfo)
        // { errno: 0, data: {....} }
    } else {
        // 未存在
        console.log(ErrorModel);
        return new ErrorModel(registerUserNameNotExistInfo)
    }

    // 调用 services 获取数据

    // 统一返回格式
}

module.exports = {
    isExist
}