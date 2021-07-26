import { CustomError } from '../services/error.service'
import TokenService from '../services/token.service'

export const AuthMiddleware = (request: any, response: any, next?: (err?: any) => any): any => {
  try {
    const authorizationHeader = request.headers.authorization
    if (!authorizationHeader) return next(new CustomError(401, 'Пользователь не авторизован!'))

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) return next(new CustomError(401, 'Пользователь не авторизован!'))

    const user = TokenService.validateAccessToken(accessToken)
    if (!user) return next(new CustomError(401, 'Пользователь не авторизован!'))

    request.user = user
    next()
  } catch (e) {
    return next(new CustomError(401, 'Пользователь не авторизован!'))
  }
}
