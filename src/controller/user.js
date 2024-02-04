/**
 * @description user controller
 * @author 夜枫林
 */

const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { getUserInfo, createUser } = require("../services/user")
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo
} = require('../model/ErrorInfo')
const doCrypto = require("../utils/cryp")

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

/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码 
 * @param {number} gender   性别（1男，2女，3苞米）
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)

    // 用户名已存在
    if (userInfo) {
        return ErrorModel(registerUserNameExistInfo)
    }

    // 注册 service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.log(ex.message, ex.stack);
        return new ErrorModel(registerFailInfo)
    }
}


module.exports = {
    isExist,
    register
}