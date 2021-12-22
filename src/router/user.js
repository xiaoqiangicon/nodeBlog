const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登陆
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = login(username, password);

    return result.then(data => {
      if (data.username) {
        
        // 操作cookie
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        // 设置session
        req.session.username = data.username;
        req.session.realname = data.realname;


        return new SuccessModel('登陆成功')
      } else {
        return new ErrorModel('登陆失败')
      }
    })
  }

  // 登陆验证得测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      // 如果没有异步，但是要封装成一个promise,可以通过promise.resolve()传入；
      return Promise.resolve(new SuccessModel({
        username: req.cookie.username
      }));
    }
    return Promise.resolve(new ErrorModel('尚未登陆'));
  }
}

module.exports = handleUserRouter;