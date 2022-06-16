import { IncomingMessage, ServerResponse } from 'http';

const rejectRequest = (req: IncomingMessage, res: ServerResponse, statusCode: number) => {
  res.statusCode = statusCode;
  res.end();
};
export default rejectRequest;
