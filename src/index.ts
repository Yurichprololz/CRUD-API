import http from 'http';
import DataBase from './DataBase';
import isUserRoute from './helper/helper';
import rejectRequest from './helper/server.helper';
import userRequestsRouter from './requests/userRequestRouter';
import usersRequestsRouter from './requests/usersRequestRouter';

const port = 8000;

const dataBase = new DataBase();

const server = http.createServer((req, res) => {
  if (isUserRoute(req.url)) {
    userRequestsRouter(req, res, dataBase);
  } else if (req.url === '/api/users') {
    usersRequestsRouter(req, res, dataBase);
  } else {
    rejectRequest(req, res, 404);
  }
});

server.listen(port, () => {
  console.log('Listening');
});
