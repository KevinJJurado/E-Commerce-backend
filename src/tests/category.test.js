const request = require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async() => {
  const user = {
    email: "test@gmail.com",
    password: "test1234"
  }
  const res = await request(app).post('/users/login').send(user)
  token = res.body.token;
})

test('GET /categories debe retornar todas las categorias', async () => {
  const res = await request(app).get('/categories')
    
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array);
})

test('POST /categories debe crear una categorias', async () => {
  const category = {
    name: 'Clothes'
  }
  const res = await request(app).post('/categories')
    .send(category)
    .set('Authorization', `Bearer ${token}`);

    console.log(res.body)
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(category.name);

});

test('PUT /categories/:id debe actualizar una categoria', async () => {
  const category = {
    name: "Shoes"
  }
  const res = await request(app).put(`/categories/${id}`)
    .send(category)
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(category.name);
});

test('DELETE /categories/:id debe borrar un usuario', async () => {
  const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});

