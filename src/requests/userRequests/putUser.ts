import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../../DataBase';
import { parseHeader } from '../../helper/data.helper';

const putUsersRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  dataBase: DataBase,
  id: string,
) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const user = parseHeader(req.headers);
  if (user) {
    res.end(dataBase.putUser(id, user));
  }
};

export default putUsersRequest;
