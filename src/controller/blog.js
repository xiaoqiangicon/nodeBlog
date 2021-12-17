const getList = (auth, keyword) => {
  // 先返回假数据，格式时正确的；
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容',
      createTime: 1546610491112,
      author: 'lee',
    },
    {
      id: 2,
      title: '标题2',
      content: '内容2',
      createTime: 1546610495555,
      author: 'lee2',
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 2,
    title: '标题2',
    content: '内容2',
    createTime: 1546610495555,
    author: 'lee2',
  }
}

const updateBlog = (id) => {
  return false;
}

const newBlog = (blogData) => {

  return {
    id: 3,
  }
}

const delBlog = (id) => {
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
}