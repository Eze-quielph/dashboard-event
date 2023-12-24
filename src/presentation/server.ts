/* eslint-disable no-undef */
import express, { NextFunction, Request, Response, Router } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import {
  CorsAdapter,
  HelmetAdapter,
  Logger,
  LoggerAdapter,
  RateLimitAdapter,
  envs,
} from '../adapters'
import swagger from '../docs/swagger'

interface Options {
  port?: number
  routes: Router
  isProduction?: boolean
}

export class Server {
  private readonly app = express()

  private readonly port: number

  private readonly routes: Router

  private readonly cors: CorsAdapter | undefined

  private readonly isLogger: Logger

  public constructor(
    { routes, port = 3002 }: Options,
    cors?: CorsAdapter,
    isLogger: Logger = new LoggerAdapter(),
  ) {
    this.port = port
    this.routes = routes
    this.cors = cors
    this.isLogger = isLogger
  }

  private enforceHttps(req: Request, res: Response, next: NextFunction) {
    const isLocalRequest =
      req.ip === '127.0.0.1' || req.hostname === 'localhost'

    const isProduction = envs.IS_PRODUCTION
    if (
      isProduction &&
      !isLocalRequest &&
      req.headers['x-forwarded-proto'] !== 'https'
    ) {
      return res.redirect(`https://${req.hostname}${req.url}`)
    }
    return next()
  }

  async start() {
    this.app.use(this.enforceHttps)
    this.app.use(this.cors!.getMiddleware())
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000')
      next()
    })
    HelmetAdapter.configure(this.app)
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(morgan('tiny'))
    this.app.use(express.static('public'))
    this.app.use(RateLimitAdapter.getLimiter())

    // Swagger
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger))

    // Routes
    this.app.use('/api', this.routes)

    // Listen server
    this.app.listen(this.port, () => {
      this.isLogger.log(`Server is running on port ${this.port}`)
    })
  }
}
