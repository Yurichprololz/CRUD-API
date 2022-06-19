import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../../DataBase';
import MessageError from '../../helper/messageError.enum';
import rejectRequest from '../../helper/server.helper';

const deleteUserByIdRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  dataBase: DataBase,
  id: string,
) => {
  const isUserExist = dataBase.getUser(id);
  if (!isUserExist) rejectRequest(req, res, MessageError.nonExistId);
  res.statusCode = 204;
  res.setHeader('Content-Type', 'application/json');
  dataBase.deleteUser(id);
  res.end();
};

export default deleteUserByIdRequest;
