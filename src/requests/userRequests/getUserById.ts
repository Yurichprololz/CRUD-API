import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../../DataBase';
import MessageError from '../../helper/messageError.enum';
import rejectRequest from '../../helper/server.helper';

const getUserByIdRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  dataBase: DataBase,
  id: string,
) => {
  const user = dataBase.getUser(id);
  if (user) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dataBase.getUser(id)));
  }
  rejectRequest(req, res, MessageError.nonExistId);
};

export default getUserByIdRequest;
