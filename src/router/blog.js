const handleBlogRouter = (req, res) => {
  const method = req.method;

  // 获取列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: '这是获取列表接口'
    }
  }

  // 获取详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: '这是详情接口'
    }
  }

  // 新建
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '这是新建接口'
    }
  }

  // 更新
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '这是更新接口'
    }
  }

  // 删除
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: '这是删除接口'
    }
  }

}

module.exports = handleBlogRouter;