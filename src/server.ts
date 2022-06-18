import http from 'http';
import DataBase from './DataBase';
import isUserRoute from './helper/helper';
import MessageError from './helper/messageError.enum';
import rejectRequest from './helper/server.helper';
import userRequestsRouter from './requests/userRequestRouter';
import usersRequestsRouter from './requests/usersRequestRouter';

const dataBase = new DataBase();

const server = http.createServer(async (req, res) => {
  try {
    if (isUserRoute(req.url)) {
      await userRequestsRouter(req, res, dataBase);
    } else if (req.url === '/api/users') {
      usersRequestsRouter(req, res, dataBase);
    } else {
      rejectRequest(req, res, MessageError.nonExistEndpoint);
    }
  } catch {
    rejectRequest(req, res, MessageError.serverWrong);
  }
});

export default server;
