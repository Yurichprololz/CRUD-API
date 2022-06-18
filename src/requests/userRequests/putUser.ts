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
  await parseHeader(req)
    .then((user) => {
      if (user) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const data = dataBase.putUser(id, user);
        res.end(JSON.stringify(data));
      }
      throw new Error('');
    })
    .catch(() => rejectRequest(req, res, MessageError.invalidBody));
};

export default putUsersRequest;
