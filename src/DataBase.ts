import getUUIDWithUser from './helper/data-base.helper';
import { isNewUser } from './helper/data.helper';
import { IUser, INewUser } from './model/user.model';

class DataBase {
  private data: IUser[] = [];

  getAllUsers(): IUser[] {
    return this.data;
  }

  addUser(data: INewUser): IUser {
    const user = getUUIDWithUser(data);
    this.data.push(user);
    return user;
  }

  getUser(id: string): IUser | undefined {
    return this.data.find((user) => user.id === id);
  }

  getUserIndex(id: string): number | undefined {
    return this.data.findIndex((user) => user.id === id);
  }

  putUser(id: string, data: INewUser) {
    const user = this.getUser(id);
    if (isNewUser(user)) {
      user.age = data.age;
      user.username = data.username;
      user.hobbies = data.hobbies;
    }
  }

  deleteUser(id: string) {
    const userIndex = this.getUserIndex(id);
    if (userIndex !== undefined) {
      this.data.splice(userIndex, 1);
    }
    // console.log('delete', userIndex)
  }
}

export default DataBase;
