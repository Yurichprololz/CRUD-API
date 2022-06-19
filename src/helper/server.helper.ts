import { IncomingMessage, ServerResponse } from 'http';
import { EOL } from 'os';
import { parseErrorMessage } from './data.helper';
import MessageError from './messageError.enum';

const rejectRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  errorCause: MessageError,
  defaultError?: Error,
) => {
  const { statusCode, message } = parseErrorMessage(errorCause);
  res.statusCode = statusCode;
  if (defaultError) {
    res.end(`${message + EOL}Error: ${defaultError.message}`);
  } else {
    res.end(message);
  }
};
export default rejectRequest;
