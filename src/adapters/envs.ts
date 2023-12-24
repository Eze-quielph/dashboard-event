import * as dotenv from 'dotenv'
import { get } from 'env-var'

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' })
} else {
  dotenv.config({ path: '.env.development' })
}

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  IS_PRODUCTION: get('IS_PRODUCTION').required().asBool(),
}
