import { IncomingMessage, ServerResponse } from 'http';
import DataBase from '../../DataBase';

const getUsersRequest = (req: IncomingMessage, res: ServerResponse, dataBase: DataBase) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(dataBase.getAllUsers()));
};

export default getUsersRequest;
