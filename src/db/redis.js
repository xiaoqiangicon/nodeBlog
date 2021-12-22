const redis = require('ioredis');
const { REDIS_CONF } = require('../conf/db');

const redisClient = new redis(REDIS_CONF);
redisClient.on('error', err => {
  console.error(err);
})

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
}

function get(key) {
  // 因为是异步，所以用promise封装
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }

      // 兼容redis数据转化
      try {
        resolve(
          JSON.parse(val)
        )
      } catch(ex) {
        resolve(val);
      }
    })
  })

  return promise;
}

module.exports = {
  set, get,
}