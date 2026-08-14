declare module 'express-timeout-handler' {
  import type {
    NextFunction,
    Request,
    RequestHandler,
    Response,
  } from 'express'

  interface TimeoutHandlerOptions {
    timeout?: number
    onTimeout?: (req: Request, res: Response, next: NextFunction) => void
    onDelayedResponse?: (
      req: Request,
      method: string,
      args: Record<number, unknown>,
      requestTime: number,
    ) => void
    disable?: string[]
  }

  interface TimeoutHandler {
    set(timeout: number): RequestHandler
    handler(options?: TimeoutHandlerOptions): RequestHandler
  }

  const timeout: TimeoutHandler

  export = timeout
}
