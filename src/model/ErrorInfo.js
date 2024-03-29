/**
 * @description 失败信息集合，包括 errno 和 message
 * @author 夜枫林
 */

module.exports = {
    // 用户名已存在
    registerUserNameExistInfo: {
        errno: 10001,
        message: '用户名存在'
    },
    //注册失败
    registerFailInfo: {
        errno: 10002,
        message: '注册失败，请重试'
    },
    // 用户名不存在
    registerUserNameNotExistInfo: {
        errno: 10003,
        message: '用户名未存在'
    },
    //登录失败
    loginFailInfo: {
        errno: 10004,
        message: '登录失败，用户名或密码错误'
    },
    // 未登录
    logincheckFailInfo: {
        errno: 10005,
        message: '您尚未登录'
    },
    // 修改密码失败
    changePasswordFailInfo: {
        errno: 10006,
        message: '修改密码失败，请重试'
    },
    // 上传文件过大
    uploadFileSizeFailInfo: {
        errno: 10007,
        message: '文件大小超出限制'
    },
    // 修改基本信息失败
    changeInfoFailInfo: {
        errno: 10008,
        message: '修改基本信息失败，请重试'
    },
    // 删除用户失败
    deleteUserFailInfo: {
        errno: 100010,
        message: '删除用户失败，请重试'
    },
    // 添加关注失败
    addFollowerFailInfo: {
        errno: 100011,
        message: '添加关注失败，请重试'
    },
    // 取消关注失败
    deleteFollowerFailInfo: {
        errno: 100012,
        message: '取消关注失败，请重试'
    },
    // 创建微博失败
    createBlogFailInfo: {
        errno: 100013,
        message: '创建微博失败，请重试'
    }


}
