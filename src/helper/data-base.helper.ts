import { INewUser, IUser } from '../model/user.model';

const getUUIDWithUser = (user: INewUser): IUser => ({ ...user, id: '123easd' });

export default getUUIDWithUser;
