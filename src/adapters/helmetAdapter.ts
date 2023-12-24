import express from 'express'
import helmet from 'helmet'

export abstract class HelmetAdapter {
  static configure(app: express.Application): void {
    app.use(helmet())
  }
}
