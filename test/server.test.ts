// import { parseErrorMessage } from '../src/helper/data.helper';
// import messageError from '../src/helper/messageError.enum';

// import DataBase from '../src/DataBase'
// import getUsersRequest from '../src/requests/usersRequest/getUsers';

// describe('helper', () => {
//   test('Lala', () => {
//     expect(parseErrorMessage(messageError.invalidBody)).toEqual({
//       statusCode: 400,
//       message: ' The body must contains required fields',
//     });
//   });

//   test('2', () => {
//     expect(parseErrorMessage(messageError.serverWrong)).toEqual({
//       statusCode: 500,
//       message: ' The server have broken. Try to send request later',
//     });
//     expect(parseErrorMessage(messageError.serverWrong)).toEqual({
//       statusCode: 500,
//       message: ' The server have broken. Try to send request later',
//     });
//   });
// });

// describe('cause 1', () => {
//   const dataBase = new DataBase();
//   test('getAllUsers', () => {
//     expect(getUsersRequest)
//   })
// })
// import request from 'supertest';
import request from 'supertest';
import server from '../src';
import { INewUser } from '../src/model/user.model';

describe('Suite 1', () => {
  let res;
  // test('get All Users', async () => {
  //   res = await request(server).get('/api/users');
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.text).toEqual('[]');
  //   // expect(res.body).toHaveProperty('post');
  // });
  // test('get All Users', async () => {
  //   res = await request(server).get('/api/users');
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.text).toEqual('[]');
  //   // expect(res.body).toHaveProperty('post');
  // });
  test('get All Users', async () => {
    const user: INewUser = {
      username: 'dsds',
      age: 22,
      hobbies: ['ts'],
    };
    res = await request(server)
      .post('/api/users')
      .send({
        username: 'kamran',
        age: 26,
        hobbies: ['1', '2'],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('kamran');
    expect(res.body.age).toBe(26);
    expect(res.body.hobbies).toEqual(['1', '2']);
  });
});
