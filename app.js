const { Resolver } = require('dns');
const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// session数据
// session的问题：目前session直接是js变量；放在nodejs进程内容中，第一进程内存有限，访问量过大，内存暴增怎么办？正式线上运行是多进程，进程之间无法共享；解决: redis;web server最常用的缓存数据库，数据存放在内存中，内存读写快，比较贵，可存储的数据量更小；断电丢失；访问速度快，内存和硬盘不是一个数量级的。
// 为什么要session适合用redis；session访问频繁，对性能要求极高。session可以不考虑断电丢失数据的问题。session数据量不会太大。
const SESSION_DATA = {};

// 获取cookie得过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000))

  return d.toGMTString();
}

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return;
    }

    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return;
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise;
}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');

  // 获取path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析query
  req.query = querystring.parse(url.split('?')[1]);

  // 获取cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2;
  cookieStr.split(';').forEach(item => {
    if (!item)  return;
    
    let cookie = item.split('=');
    let key = cookie[0].trim();
    let value = cookie[1].trim();
    req.cookie[key] = value;
  })

  // 解析session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];


  // 处理postData
  getPostData(req).then(postData => {
    req.body = postData;

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return;
    }

    // 处理user路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return;
    }

    // 未命中路由返回404
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write('404 not found');
    res.end();
  });

  
}

module.exports = serverHandle;

// env: process.env.NODE_ENV,