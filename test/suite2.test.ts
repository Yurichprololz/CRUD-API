import request from 'supertest';
import server from '../src/server';
import { INewUser } from '../src/model/user.model';

describe('Suite 2', () => {
  afterAll(() => server.close());

  let res;
  let id: string;
  let id2: string;

  test('GET All Users №1', async () => {
    res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('[]');
  });

  test('POST User №1', async () => {
    const user: INewUser = {
      username: 'Yura',
      age: 26,
      hobbies: ['ts'],
    };

    res = await request(server).post('/api/users').send(user);
    id = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Yura');
    expect(res.body.age).toBe(26);
    expect(res.body.hobbies).toEqual(['ts']);
  });

  test('POST User №2', async () => {
    const user: INewUser = {
      username: 'Dasha',
      age: 22,
      hobbies: [],
    };

    res = await request(server).post('/api/users').send(user);
    id2 = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Dasha');
    expect(res.body.age).toBe(22);
    expect(res.body.hobbies).toEqual([]);
  });

  test('GET All Users №2', async () => {
    res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)).toEqual([{
      username: 'Yura', age: 26, hobbies: ['ts'], id,
    }, {
      username: 'Dasha', age: 22, hobbies: [], id: id2,
    }]);
  });

  test('wrong DELETE User request №1', async () => {
    res = await request(server)
      .delete(`/api/users/${id}12`);

    expect(res.statusCode).toBe(400);
  });

  test('wrong POST User request №1', async () => {
    res = await request(server)
      .post('/api/users')
      .send({ name: 'Yura', ages: 22, hobbies: ['ts', 'js'] });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({});
  });

  test('wrong PUT User request №1', async () => {
    res = await request(server)
      .put(`/api/users/${id}`)
      .send({ user: 'smb', ages: 33, hobbie: ['smt'] });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({});
  });

  test('GET All Users №3', async () => {
    res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)).toEqual([{
      username: 'Yura', age: 26, hobbies: ['ts'], id,
    }, {
      username: 'Dasha', age: 22, hobbies: [], id: id2,
    }]);
  });
});
