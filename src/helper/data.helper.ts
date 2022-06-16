import { IncomingHttpHeaders } from 'http';
import { INewUser } from '../model/user.model';

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

function isNewUser(data: INewUser | undefined): data is INewUser {
  return (
    (data as INewUser).username !== undefined
    && (data as INewUser).age !== undefined
    && (data as INewUser).hobbies !== undefined
  );
}

export { parseHeader, parseUserId, isNewUser };
