import rateLimit from 'express-rate-limit';

export abstract class RateLimitAdapter {
  static getLimiter() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    });
  }
}
