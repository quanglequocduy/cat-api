export {};

declare global {
  namespace Express {
    export interface Request extends express.Request {
      user: any;
    }
  }
}
