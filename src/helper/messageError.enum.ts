enum MessageError {
  invalidId = '400 || The ID doesn\'t valide',
  invalidBody = '400 || The body must contains required fields',
  nonExistId = '404 || You ID don\'t exist',
  nonExistEndpoint = '404 || The endpoint don\'t exist',
  serverWrong = '500 || The server have broken. Try to send request later',
}

export default MessageError;
