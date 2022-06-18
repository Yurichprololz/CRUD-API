import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../../DataBase';
import { parseHeader } from '../../helper/data.helper';
import MessageError from '../../helper/messageError.enum';
import rejectRequest from '../../helper/server.helper';

const putUsersRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  dataBase: DataBase,
  id: string,
) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  await parseHeader(req)
    .then((user) => {
      if (user) {
        const data = dataBase.putUser(id, user);
        res.end(JSON.stringify(data));
      }
    })
    .catch(() => rejectRequest(req, res, MessageError.invalidBody));
};

export default putUsersRequest;
