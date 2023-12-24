import cors, { RequestHandler } from 'express';

export interface CorsAdapterOptions {
  allowedOrigins: string[];
}

export class CorsAdapter {
  private readonly corsOptions: unknown;

  constructor(options: CorsAdapterOptions) {
    this.corsOptions = {
      origin: (origin: unknown, callback: Function) => {
        const isAllowed = options.allowedOrigins.includes(
          (origin as string) || '',
        );
        callback(null, isAllowed);
      },
    };
  }

  public getMiddleware(): RequestHandler {
    return cors();
  }
}
