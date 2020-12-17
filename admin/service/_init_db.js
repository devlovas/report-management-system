const _query_db = require('./_mysql_query')

// 创建数据库
// const sql = 'CREATE DATABASE IF NOT EXISTS reportcms DEFAULT CHARSET utf8 COLLATE utf8_general_ci;'

async function main () {

  // 创建用户表
  await _query_db('reportcms', `CREATE TABLE IF NOT EXISTS user(\
    ID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,\
    ACCOUNT CHAR(11) NOT NULL,\
    PASSWORD CHAR(32) NOT NULL,
    INVITE_CODE CHAR(8) NOT NULL,
    C_DATETIME TIMESTAMP NOT NULL)`)
}

main()
