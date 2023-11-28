const request  = require('supertest');
const app = require('../app');
require('../models')

let id;
let token;


beforeAll(async () => {
  const user = {
    email: "test@gmail.com",
    password: "test1234"
  }
  const res = await request(app).post('/users/login').send(user)
  token = res.body.token;
});

test('GET /images debe retornar todas las imagenes', async () => {
  const res = await request(app)
    .get('/images')
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array);
});