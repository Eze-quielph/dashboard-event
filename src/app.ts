import { CorsAdapter, CorsAdapterOptions } from './adapters'
import { AppRoutes } from './presentation/main.routes'
import { Server } from './presentation/server'
import { envs } from './adapters'
;(() => {
  main()
})()

async function main() {
  const corsOptions: CorsAdapterOptions = {
    allowedOrigins: ['http://localhost:3000'],
  }

  new Server(
    {
      port: envs.PORT,
      routes: AppRoutes.Routes,
    },
    new CorsAdapter(corsOptions),
  ).start()
}
