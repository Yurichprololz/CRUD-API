import request from 'supertest';
import server from '../src/server';
import { INewUser } from '../src/model/user.model';

describe('Suite 1', () => {
  afterAll(() => server.close());

  let res;
  let id: string;
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

  test('GET current User №1', async () => {
    res = await request(server).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('Yura');
    expect(res.body.age).toBe(26);
    expect(res.body.hobbies).toEqual(['ts']);
  });

  test('PUT current User №1', async () => {
    res = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: 'Yura', age: 27, hobbies: ['ts', 'js'] });

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('Yura');
    expect(res.body.age).toBe(27);
    expect(res.body.hobbies).toEqual(['ts', 'js']);
  });

  test('DELETE current User №1', async () => {
    res = await request(server)
      .delete(`/api/users/${id}`);

    expect(res.statusCode).toBe(204);
    expect(res.body).toBeFalsy();
  });

  test('GET current User №2', async () => {
    res = await request(server)
      .get(`/api/users/${id}`);

    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(' You ID don\'t exist');
  });
});
