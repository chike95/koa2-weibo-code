/**
 * @description sequelize 实例
 * @author 夜枫林
 */
const Sequelize = require('sequelize')
const { isProd, isTest } = require('../utils/env')

const { MYSQL_CONF } = require('../conf/db')
const { host, user, password, database } = MYSQL_CONF

const conf = {
    host,
    dialect: 'mysql'
}

// 3-9线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }
}

// 3-9测试环境关闭 sql 语句
if (isTest) {
    conf.logging = () => { }
}



const seq = new Sequelize(database, user, password, conf)

module.exports = seq  