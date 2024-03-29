/**
 * @description 存储配置
 * @author 夜枫林
 */

const { isProd } = require('../utils/env')

// 本地 redis 配置
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

// 本地 mysql 配置
let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'koa2_weibo_code'
}

if (isProd) {
    // 线上的 redis 配置
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }

    // 线上的 mysql 配置
    let MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'my_db'
    }
}




module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}