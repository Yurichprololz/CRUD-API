import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../../DataBase';

const deleteUserByIdRequest = (
  _req: IncomingMessage,
  res: ServerResponse,
  dataBase: DataBase,
  id: string,
) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  dataBase.deleteUser(id);
  res.end();
};

export default deleteUserByIdRequest;
