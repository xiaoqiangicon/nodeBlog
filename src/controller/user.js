
const loginCheck = (username, password) => {
  if (username === 'lee' && password === '123') {
    return {
      msg: '这是登陆的接口'
    }
  } 
}

module.exports = {
  loginCheck,
}