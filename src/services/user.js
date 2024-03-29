/**
 * @description user service
 * @author 夜枫林
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    let whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })

    // 未找到
    if (result == null) {
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)

    // 返回查到的数据
    return formatRes
}

/**
 * 创建用户
 * @param {string} userName 用户名 
 * @param {string} password 密码 
 * @param {number} gender 性别 
 * @param {string} nickName 昵称 
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues
}

/**
 * 更新用户信息
 * @param {object} param0 要修改的内容  { newPassword, newNickName, newPicture, newCity }
 * @param {string} param1 查询条件 { userName, password }
 */
async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }

    // 拼接查询条件
    const whereData = {
        userName,
    }
    if (password) {
        whereData.password = password
    }

    // 执行修改
    const result = await User.update(updateData, { where: whereData })
    return result[0] > 0 // 行数，修改成功返回1，失败返回0
}


module.exports = {
    getUserInfo,
    createUser,
    updateUser
}