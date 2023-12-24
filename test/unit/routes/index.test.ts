/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Server } from '../../../src/presentation/server'
import request from 'supertest'
import { AppRoutes } from '../../../src/presentation/main.routes'
const server = new Server({ routes: AppRoutes.Routes })

describe('Test Initialize', () => {
  it('should return a router', async () => {
    const res = await request(server.start).get('/api/example')

    expect(res.status).toBe(200)
  })
})
