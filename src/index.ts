import http from 'http';
import DataBase from './DataBase';
import parseHeader from './helper/data.helper';
import { getUserId, isUserRoute } from './helper/helper';

const port = 8000;

const dataBase = new DataBase();

const server = http.createServer((req, res) => {
  if (isUserRoute(req.url)) {
    const id = getUserId(req.url);
    res.statusCode = 200;
    res.write(id);
  } else if (req.url === '/api/users') {
    switch (req.method) {
      case 'GET':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(dataBase.getAllUser()));
        break;

      case 'POST':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const user = parseHeader(req.headers);

        if (user) {
          dataBase.addUser(user);
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
