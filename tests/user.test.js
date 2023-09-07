const request = require('supertest')
const app = require('../app') // Import your Express app

// Define your correct password and an incorrect password
const correctPassword = 'IAI2'
const incorrectPassword = 'IncorrectPassword'

/* Testing the /api/user endpoint. */
describe('GET /api/user', () => {
  it('No password :: 400 error', async () => {
    // No x-password header provided
    const res = await request(app).get('/api/user')
    expect(res.statusCode).toBe(400)
  })

  it('Incorrect password :: 401 error', async () => {
    // Incorrect x-password header provided
    const res = await request(app)
      .get('/api/user')
      .set('x-password', incorrectPassword)
    expect(res.statusCode).toBe(401)
  })

  it('Correct password :: 200 success', async () => {
    // Correct x-password header provided
    const res = await request(app)
      .get('/api/user')
      .set('x-password', correctPassword)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBeGreaterThan(0)
  })
})
