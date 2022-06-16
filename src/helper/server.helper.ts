import { IncomingMessage, ServerResponse } from 'http';
import { parseErrorMessage } from './data.helper';
import MessageError from './messageError.enum';

const rejectRequest = (req: IncomingMessage, res: ServerResponse, errorCause: MessageError) => {
  const { statusCode, message } = parseErrorMessage(errorCause);
  res.statusCode = statusCode;
  res.end(message);
};
export default rejectRequest;
