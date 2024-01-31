/**
 * @description jest server
 * @author 夜枫林 
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)

