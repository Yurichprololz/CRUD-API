import getUUIDWithUser from './helper/data-base.helper';
import { IUser, INewUser } from './model/user.model';

class DataBase {
  private data: IUser[] = [];

  getAllUser() {
    return this.data;
  }

  addUser(data: INewUser) {
    const user = getUUIDWithUser(data);
    this.data.push(user);
  }
}

export default DataBase;
