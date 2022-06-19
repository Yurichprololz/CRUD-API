import request from 'supertest';
import server from '../src/server';
import { INewUser } from '../src/model/user.model';

describe('Suite 2', () => {
  afterAll(() => server.close());

  let res;
  let id: string;

  test('POST User №1', async () => {
    const user = {
      username: 2222,
      age: 'a lot',
      hobbies: null,
    };

    res = await request(server).post('/api/users').send(user);
    id = res.body.id;
    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({});
  });

  test('GET All Users №1', async () => {
    res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('[]');
  });

  test('POST User №2', async () => {
    const user: INewUser = {
      username: 'Dasha',
      age: 22,
      hobbies: ['footbal'],
    };

    res = await request(server).post('/api/users').send(user);
    id = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Dasha');
    expect(res.body.age).toBe(22);
    expect(res.body.hobbies).toEqual(['footbal']);
  });

  test('GET User №1', async () => {
    res = await request(server).get(`/api/users/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)).toEqual({
      username: 'Dasha',
      age: 22,
      hobbies: ['footbal'],
      id,
    });
  });

  test('wrong PUT User request №1', async () => {
    res = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: null, age: 'a lot', hobbies: 'smt' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({});
  });

  test('wrong PUT User request №2', async () => {
    res = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: 'Yura', age: NaN, hobbies: ['smt'] });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({});
  });

  test('wrong PUT User request №3', async () => {
    res = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: null, age: 22, hobbies: ['smt'] });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({});
  });

  test('wrong PUT User request №4', async () => {
    res = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: 'Yura', age: 22, hobbies: null });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({});
  });

  test('PUT User request №1', async () => {
    res = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: 'null', age: 22, hobbies: ['smt'] });

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      username: 'null', age: 22, hobbies: ['smt'], id,
    });
  });

  test('PUT User request №2', async () => {
    res = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: 'Sasha', age: 22, hobbies: ['smt'] });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      username: 'Sasha', age: 22, hobbies: ['smt'], id,
    });
  });
});
