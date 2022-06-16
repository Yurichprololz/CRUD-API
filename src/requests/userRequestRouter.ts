import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../DataBase';
import { parseUserId, uuidValidateV4 } from '../helper/data.helper';
import rejectRequest from '../helper/server.helper';
import deleteUserByIdRequest from './userRequests/deleteUser';
import getUserByIdRequest from './userRequests/getUserById';
import putUsersRequest from './userRequests/putUser';

const userRequestsRouter = (req: IncomingMessage, res: ServerResponse, dataBase: DataBase) => {
  const id = parseUserId(req.url);
  if (id && uuidValidateV4(id)) {
    switch (req.method) {
      case 'GET':
        getUserByIdRequest(req, res, dataBase, id);
        break;

      case 'PUT':
        putUsersRequest(req, res, dataBase, id);
        break;

      case 'DELETE':
        deleteUserByIdRequest(req, res, dataBase, id);
        break;

      default:
        rejectRequest(req, res, 404);

        break;
    }
  }
  rejectRequest(req, res, 400);
};

export default userRequestsRouter;
