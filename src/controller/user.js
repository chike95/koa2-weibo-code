/**
 * @description user controller
 * @author 夜枫林
 */

const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { getUserInfo, createUser } = require("../services/user")
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    loginFailInfo
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
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册用户
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
            password,
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.log(ex.message, ex.stack);
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录用户
 * @param {Object} ctx koa ctx上下文
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    // 获取用户信息
    const userInfo = await getUserInfo(userName, password)
    // 登录失败
    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功 ctx.session.userInfo = xxx
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel(ctx.session.userInfo)
}



module.exports = {
    isExist,
    register,
    login
}