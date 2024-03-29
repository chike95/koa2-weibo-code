/**
 * @description 数据格式化
 * @author 夜枫林
 */

const { DEFALULT_PICTURE } = require('../conf/constant')

/**
 * 用户默认头像
 * @param {object} obj 用户对象
 * @returns 
 */
function _formatUserPicture(obj) {
    if (obj.picture === null) {
        obj.picture = DEFALULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
    if (list == null) {
        return list
    }

    // 数组 - 用户列表
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}