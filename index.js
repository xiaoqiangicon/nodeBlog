const { Console } = require('console');
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  // 设置返回格式为JSON,返回的都是字符串，只是规定字符串格式；
  res.setHeader('Content-type', 'application/json');

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query,
  }

  if (method === 'GET') {
    res.end(
      JSON.stringify(resData)
    )
  }
  if (method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      resData.postData = postData;
      res.end(
        JSON.stringify(resData)
      )
    })
  }

  // if (req.method === 'POST') {
  //   console.log('content-type', req.headers['content-type']);
  //   let postData = '';
  //   req.on('data', chunk => {
  //     postData += chunk.toString();
  //   })
  //   req.on('end', () => {
  //     console.log(postData);
  //     res.end('hello world');
  //   })
  // }
  // const url = req.url;
  // console.log('url', url);
  // req.query = querystring.parse(url.split('?')[1]);
  // console.log('query', req.query);
  // res.writeHead(200, {'content-type': 'text/html'});
  // res.end(JSON.stringify(req.query))
})

server.listen(3000, () => {
  console.log('listening on 3000 port');
})