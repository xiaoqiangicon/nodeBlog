const { exec } = require('../db/mysql');

const getList = (author, keyword) => {

  // 1=1永远成立，但是在这可以占位可供where查询
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}' `
  }
  sql += `order by id desc;`;

  // 返回promise；
  return exec(sql);
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`

  return exec(sql).then(rows => {
    return rows[0]
  })
}

const updateBlog = (blogData = {}) => {
  const id = blogData.id;
  const title = blogData.title;
  const content = blogData.content;

  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `

  return exec(sql).then(updateData => {
    console.log('updateData', updateData);
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

const newBlog = (blogData) => {

  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createTime = Date.now();

  const sql = `
    insert into blogs (title, content, createtime, author) 
    values ('${title}', '${content}', '${createTime}','${author}')
  `

  return exec(sql).then(insertData => {
    // console.log('insertData', insertData);
    return {
      id: insertData.insertId
    }
  })
}

const delBlog = (id, author) => {
  // 考虑数据得软删除，不要使用硬删除，使用state记录
  const sql = `
    delete from blogs where id='${id}' and author='${author}'
  `; 
  return exec(sql).then(delDate => {
    if (delDate.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
}