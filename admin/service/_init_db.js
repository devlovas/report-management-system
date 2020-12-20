const { _sql } = require('./_mysql_query')

// 创建数据库
// const sql = 'CREATE DATABASE IF NOT EXISTS reportcms DEFAULT CHARSET utf8 COLLATE utf8_general_ci;'

async function main () {
  try {
    // 创建用户表
    await _sql('reportcms', `CREATE TABLE IF NOT EXISTS user(\
      ID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,\
      ACCOUNT CHAR(11) NOT NULL,\
      PASSWORD CHAR(32) NOT NULL,
      INVITE_CODE CHAR(8) NOT NULL,
      C_DATETIME TIMESTAMP NOT NULL)`)

    // 创建分类表
    await _sql('reportcms', `CREATE TABLE IF NOT EXISTS category(\
      ID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,\
      LABEL CHAR(10) NOT NULL,\
      C_DATETIME TIMESTAMP NOT NULL)`)

    // 创建产品表
    await _sql('reportcms',  `CREATE TABLE IF NOT EXISTS product(\
      ID SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,\
      NAME CHAR(30) NOT NULL,\
      CLASSIFY CHAR(30) NOT NULL,\
      C_DATETIME TIMESTAMP NOT NULL)`)

  } catch(e) { console.log(e) }
}

main()
