const util = require('util')
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    queueLimit: 0,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool