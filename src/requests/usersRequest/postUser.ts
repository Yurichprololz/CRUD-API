import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../../DataBase';
import { parseHeader } from '../../helper/data.helper';
import MessageError from '../../helper/messageError.enum';
import rejectRequest from '../../helper/server.helper';

const postUserRequest = async (req: IncomingMessage, res: ServerResponse, dataBase: DataBase) => {
  const newUser = await parseHeader(req);

  if (newUser) {
    const user = dataBase.addUser(newUser);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    rejectRequest(req, res, MessageError.invalidBody);
  }
};

export default postUserRequest;
