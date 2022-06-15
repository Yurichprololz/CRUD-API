import http from 'http';

const port = 8000;

const isUserRoute = (url: string | undefined): boolean => {
  if (url) {
    return /\/api\/users\/\w+/gm.test(url);
  }
  return false;
};

const getUserId = (url: string | undefined): string | undefined => {
  if (url) {
    const arr = url.split('/');
    return arr[arr.length - 1];
  }
  return undefined;
};

const server = http.createServer((req, res) => {
  if (isUserRoute(req.url)) {
    const id = getUserId(req.url);
    res.statusCode = 200;
    res.write(id);
  } else if (req.url === '/api/users') {
    res.statusCode = 200;
    res.write('user');
  } else {
    res.statusCode = 404;
  }

  res.end('');
});

server.listen(port, () => {
  console.log('Listen');
});
