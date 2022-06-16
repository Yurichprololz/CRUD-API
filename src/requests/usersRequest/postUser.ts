import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../../DataBase';
import { parseHeader } from '../../helper/data.helper';

const postUserRequest = (req: IncomingMessage, res: ServerResponse, dataBase: DataBase) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const newUser = parseHeader(req.headers);

  if (newUser) {
    const user = dataBase.addUser(newUser);
    res.end(JSON.stringify(user));
  }
};

export default postUserRequest;
