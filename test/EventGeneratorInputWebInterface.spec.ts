import * as supertest from 'supertest'
import app from '../src/EventGeneratorInputWebInterface'

describe('EventGeneratorInput', () => {
  it('works', () =>
    supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});
