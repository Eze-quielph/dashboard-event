import { Router } from 'express'

/**
 * @swagger
 * tags:
 *   name: main
 *   description: Endpoints for main and example
 */
export class AppRoutes {
  static get Routes(): Router {
    const routes = Router()

    /**
     * @swagger
     * /example helo world:
     *   get:
     *     summary: example
     *     tags: [example]
     *     responses:
     *       200:
     *         description: Successful response
     */
    routes.get('/example', (req, res) => {
      res.status(200).send('Hello World!')
    })
    return routes
  }
}
