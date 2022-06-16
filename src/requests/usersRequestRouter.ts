import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../DataBase';
import getUsersRequest from './usersRequest/getUsers';
import postUserRequest from './usersRequest/postUser';

const usersRequestsRouter = (req: IncomingMessage, res: ServerResponse, dataBase: DataBase) => {
  switch (req.method) {
    case 'GET':
      getUsersRequest(req, res, dataBase);
      break;

    case 'POST':
      postUserRequest(req, res, dataBase);
      break;
    default:
      res.statusCode = 404;

      break;
  }
  // rejectRequest(req, res, 400);
};
export default usersRequestsRouter;
