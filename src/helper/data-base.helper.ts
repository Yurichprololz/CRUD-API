import { v4 as uuidv4 } from 'uuid';
import { INewUser, IUser } from '../model/user.model';

const getUUIDWithUser = (user: INewUser): IUser => ({ ...user, id: uuidv4() });

export default getUUIDWithUser;
