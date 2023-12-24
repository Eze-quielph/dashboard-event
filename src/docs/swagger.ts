import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'
import { envs } from '../adapters'

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.1',
  info: {
    title: 'Clean Node API',
    version: '1.0.0',
    description: 'documentation of the API of the Clean Node API',
  },

  servers: [
    {
      url: `http:localhost:${envs.PORT}/api`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
        },
      },
      user: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
    },
  },
}

const options: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/presentation/**/**/*.routes.ts'],
}

export default swaggerJSDoc(options)
