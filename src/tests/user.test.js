const request = require('supertest')
const app = require('../app')

let id;
let token;



test('POST /users debe crear un nuevo usuario', async () => {
  const user = {
    firstName: 'Kevin',
    lastName: 'Jurado',
    email: "KevinJ@gmail.com",
    password: '123456789',
    phone: '123456789'
  }
  const res = await request(app).post('/users').send(user);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
});

test('POST /users/login debe loguear un usuario', async () => {
  const body = {
    email: "Kevin@gmail.com",
    password: "123456789"
  }
  const res = await request(app).post(`/users/login`).send(body);
  token = res.body.token
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});
test('POST /users/login debe retornar credenciales invalidas', async () => {
  const body = {
    email: "Kevin@gmail.com",
    password: "1234567incorrecta"
  }
  const res = await request(app).post(`/users/login`).send(body);

  expect(res.status).toBe(401);
});

test('GET /users debe retornar todos los usuarios', async () => {
  const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  
});
test('PUT /users debe actualizar un usuario', async () => {
  const user = {
    firstName: "Kevin update",
  }
  const res = await request(app)
    .put(`/users/${id}`)
    .send(user)
    .set('Authorization', `Bearer ${token}`);

    console.log(res.body)

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(user.firstName);
});

test('DELETE /users/id /users debe borrar un usuario', async () => {
  const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});

