/**
 * @description 数据模型入口文件
 * @author 夜枫林
 */

const User = require('./User')
const Blog = require('./Blog')

// Blog外键关联到User
Blog.belongsTo(User, {
    foreignKey: 'userId',
})
User.hasMany(Blog, {
    foreignKey: 'userId',
})

module.exports = { User, Blog }
