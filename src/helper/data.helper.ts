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

export default parseHeader;
