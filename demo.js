const mysql = require('mysql');

// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   port: 3306,
//   database: 'myblog'
// })

// // 解析cookie
// const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2;

// // 开始连接
// con.connect();

// // 执行sql语句
// const sql = `select * from blogs`;
// con.query(sql, (err, result) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(result, '1234');
// })

// // 关闭连接
// con.end();

// redis
const redis = require('redis');

const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', err => {
  console.error(err);
})

// 测试
redisClient.set('name', 'lee', redis.print);
redisClient.get('name', (err, valu) => {
  if (err) {
    console.err(err);
    return;
  }
  console.log('val', val);

  // 推出
  redisClient.quit();
})
