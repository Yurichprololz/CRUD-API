import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../../DataBase';
import { parseHeader } from '../../helper/data.helper';
import MessageError from '../../helper/messageError.enum';
import rejectRequest from '../../helper/server.helper';

const postUserRequest = (req: IncomingMessage, res: ServerResponse, dataBase: DataBase) => {
  console.log(req.headers);
  res.statusCode = 201;
  res.setHeader('Content-Type', 'application/json');
  const newUser = parseHeader(req.headers);

  if (newUser) {
    const user = dataBase.addUser(newUser);
    res.end(JSON.stringify(user));
  }
  rejectRequest(req, res, MessageError.invalidBody);
};

export default postUserRequest;
