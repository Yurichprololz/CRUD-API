import http from 'http';
import DataBase from './DataBase';
import { parseHeader, parseUserId } from './helper/data.helper';
import isUserRoute from './helper/helper';

const port = 8000;

const dataBase = new DataBase();

const server = http.createServer((req, res) => {
  if (isUserRoute(req.url)) {
    const id = parseUserId(req.url);
    if (!id) return;
    switch (req.method) {
      case 'GET':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(dataBase.getUser(id)));

        break;
      case 'PUT':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const user = parseHeader(req.headers);
        if (user) {
          res.end(dataBase.putUser(id, user));
        }
        break;
      case 'DELETE':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        dataBase.deleteUser(id);
        res.end();
        break;

      default:
        break;
    }
  } else if (req.url === '/api/users') {
    switch (req.method) {
      case 'GET':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(dataBase.getAllUsers()));
        break;

      case 'POST':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const newUser = parseHeader(req.headers);

        if (newUser) {
          const user = dataBase.addUser(newUser);
          res.end(JSON.stringify(user));
        }
        break;
      default:
        res.statusCode = 404;

        break;
    }
  } else {
    res.statusCode = 404;
  }

  res.end('');
});

server.listen(port, () => {
  console.log('Listen');
});
