/**
 * @description 微博 service
 * @author 夜枫林
 */

const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 创建微博
 * @param {*} param0 
 * @returns 
 */
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {object} param0 查询参数{userName, pageIndex = 0, pageSize = 10}
 */
async function getBlogListByUser({
    userName, pageIndex = 0, pageSize = 10
}) {
    // 查询条件
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }
    // 查询数据
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User, // 关联查询
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })

    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组

    // 获取 dataValues
    let blogList = result.rows.map(row => row.dataValues)

    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser
}