const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登陆验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登陆'));
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);

    if (req.query.isadmin) {
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        return loginCheckResult;
      }
      // 强制查询自己的博客
      author = req.session.username;
    }
    const result = getList(author, keyword);
    return result.then(listData => {
      return new SuccessModel(listData);
    })
  }

  // 获取详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const data = getDetail(id);
    
    // return new SuccessModel(data);
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data);
    })
  }

  // 新建
  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    // const blogData = req.body;
    // const data = newBlog(blogData); 
    // return new SuccessModel(data);
    const author = req.session.username;
    req.body.author = author; // 假数据待开发登陆时改成真实数据
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    })
  }

  // 更新
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    // const data = updateBlog(id);

    // if (data) {
    //   return new SuccessModel(data);
    // } else {
    //   return new ErrorModel('更新失败');
    // }
    const result = updateBlog(req.body);
    return result.then(val => {
      if (val) {
        return new SuccessModel(val);
      } else {
        return new ErrorModel('更新失败');
      }
    })
  }

  // 删除
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    const author = req.session.username;
    const id = req.body.id;
    const result = delBlog(id, author);

    return result.then(val => {
      if (val) {
        return new SuccessModel(val);
      } else {
        return new ErrorModel('更新失败');
      }
    })
  }

}

module.exports = handleBlogRouter;