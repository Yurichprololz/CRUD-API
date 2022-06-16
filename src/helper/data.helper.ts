import { IncomingHttpHeaders } from 'http';
import { validate, version } from 'uuid';
import { INewUser } from '../model/user.model';
import MessageError from './messageError.enum';

const parseHeader = (headers: IncomingHttpHeaders): INewUser | void => {
  const { username, age, hobbies } = headers as unknown as INewUser;
  if (username && age && hobbies) {
    return {
      username,
      age,
      hobbies,
    };
  }
  return undefined;
};

const parseUserId = (url: string | undefined): string | undefined => {
  if (url) {
    const arr = url.split('/');
    return arr[arr.length - 1];
  }
  return undefined;
};

const parseErrorMessage = (msg: MessageError) => {
  const arr = msg.split('||');
  return {
    statusCode: Number(arr[0]),
    message: arr[1],
  };
};

function isNewUser(data: INewUser | undefined): data is INewUser {
  return (
    (data as INewUser).username !== undefined
    && (data as INewUser).age !== undefined
    && (data as INewUser).hobbies !== undefined
  );
}

const uuidValidateV4 = (uuid: string): boolean => validate(uuid) && version(uuid) === 4;

export {
  parseHeader, parseUserId, isNewUser, uuidValidateV4, parseErrorMessage,
};
