const request = require('supertest')
const app = require('../app') // Import your Express app

// Define your correct password and an incorrect password
const correctPassword = 'IAI2'
const incorrectPassword = 'IncorrectPassword'

// Reusable test function
const testEndpoint = (method, endpoint, statusCode, data, description) => {
  it(`No password :: 400 error`, async () => {
    const res = await request(app)[method](endpoint)
    expect(res.statusCode).toBe(400)
  })

  it(`Incorrect password :: 401 error`, async () => {
    const res = await request(app)
      [method](endpoint)
      .set('x-password', incorrectPassword)
    expect(res.statusCode).toBe(401)
  })

  it(`${description} :: ${statusCode} success`, async () => {
    const res = await request(app)
      [method](endpoint)
      .set('x-password', correctPassword)
      .send(data)
    expect(res.statusCode).toBe(statusCode)

    // Additional assertions as needed
  })
}

/* Testing the /api/user endpoint for different HTTP methods. */
describe('User Endpoint Tests', () => {
  describe('GET /api/user', () => {
    testEndpoint('get', '/api/user', 200, null, 'Get users list')
  })

  describe('POST /api/user', () => {
    testEndpoint(
      'post',
      '/api/user',
      201,
      {
        name: 'James',
        last_name: 'DIO',
        email: 'James@example.com',
        password: 'MyPassworddd', // Adjust the data as needed
      },
      'Create new user {valid password}'
    )

    testEndpoint(
      'post',
      '/api/user',
      400,
      {
        name: 'James',
        last_name: 'DIO',
        email: 'James@example.com',
        password: 'MyP', // password not correct 8 chars at least
      },
      'Create new user {password is not valid}'
    )
  })

  // describe('PUT /api/user/1', () => {
  //   testEndpoint('put', '/api/user/1', 200)
  // })

  // describe('DELETE /api/user/1', () => {
  //   testEndpoint('delete', '/api/user/1', 200)
  // })
})
