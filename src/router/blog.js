const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }

  // 获取详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id);
    
    return new SuccessModel(data);
  }

  // 新建
  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = req.body;
    const data = newBlog(blogData); 
    return new SuccessModel(data);
  }

  // 更新
  if (method === 'POST' && req.path === '/api/blog/update') {
    const data = updateBlog(id);

    if (data) {
      return new SuccessModel(data);
    } else {
      return new ErrorModel('更新失败');
    }
  }

  // 删除
  if (method === 'POST' && req.path === '/api/blog/del') {
    const data = delBlog(id);

    if (data) {
      return new SuccessModel(data);
    } else {
      return new ErrorModel('更新失败');
    }
  }

}

module.exports = handleBlogRouter;