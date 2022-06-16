interface INewUser {
  username: string;
  age: number;
  hobbies: string[] | [];
}

interface IUser extends INewUser {
  id: string;
}

export { INewUser, IUser };
