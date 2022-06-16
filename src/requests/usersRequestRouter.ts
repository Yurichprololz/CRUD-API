import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../DataBase';
import MessageError from '../helper/messageError.enum';
import rejectRequest from '../helper/server.helper';
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
      rejectRequest(req, res, MessageError.nonExistEndpoint);
      break;
  }
};
export default usersRequestsRouter;
