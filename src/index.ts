import http from 'http';
import env from 'dotenv';
import DataBase from './DataBase';
import isUserRoute from './helper/helper';
import rejectRequest from './helper/server.helper';
import userRequestsRouter from './requests/userRequestRouter';
import usersRequestsRouter from './requests/usersRequestRouter';
import MessageError from './helper/messageError.enum';

env.config();

const port = process.env.PORT || 8000;

const dataBase = new DataBase();

const server = http.createServer((req, res) => {
  try {
    if (isUserRoute(req.url)) {
      userRequestsRouter(req, res, dataBase);
    } else if (req.url === '/api/users') {
      usersRequestsRouter(req, res, dataBase);
    } else {
      rejectRequest(req, res, MessageError.nonExistEndpoint);
    }
  } catch {
    rejectRequest(req, res, MessageError.serverWrong);
  }
});

server.listen(port, () => {
  console.log('Listening');
});
