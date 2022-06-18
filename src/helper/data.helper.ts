import { IncomingMessage } from 'http';
import { validate, version } from 'uuid';
import { INewUser } from '../model/user.model';
import MessageError from './messageError.enum';

const isValideTypes = (username: unknown, age: unknown, hobbies: unknown): boolean => {
  return typeof username === 'string'
    && typeof age === 'number'
    && !Number.isNaN(age)
    && Array.isArray(hobbies);
};

const parseHeader = (req: IncomingMessage) => new Promise((res, rej) => {
  let data = '';
  req.setEncoding('utf8');

  req
    .on('data', (chunk) => {
      data += chunk;
    })
    .on('end', () => {
      res(data);
    })
    .on('error', (err) => {
      rej(err);
    });
}).then((data) => {
  const { username, age, hobbies } = JSON.parse(data as string);

  if (isValideTypes(username, age, hobbies)) {
    return {
      username,
      age,
      hobbies,
    };
  }
  return undefined;
});

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
