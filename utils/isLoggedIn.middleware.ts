import { Injectable, NestMiddleware } from '@nestjs/common';
import express from 'express';

@Injectable()
export class isLoggedIn implements NestMiddleware {
  use(req: express.Request, res: express.Response, next: () => void) {
    if (req.session.isLoggedIn) {
      next();
      return;
    }
    res.status(401).end('Please Login');
    return;
  }
}
