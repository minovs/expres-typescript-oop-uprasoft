import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(err: any, request: any, response: any, next: () => any) {
    if (process.env.NODE_ENV === 'development') console.log(err)
    if (err.status) return response.status(err.status).json(err.message)
    return response.status(500).json({ message: 'Непредвиденная ошибка' })
  }
}
