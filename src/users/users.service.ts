import bcrypt from 'bcrypt-nodejs'
import UsersModel from './users.model'
import TokenService from '../services/token.service'
import { CustomError } from '../services/error.service'
import { UserType } from '../types/types'

export class UsersService {
  async auth(login: string, password: string) {
    try {
      const user = await UsersModel.checkLogin(login)
      if (user.length === 0) throw new CustomError(400, `Логин и пароль неверны!`)
      const result = bcrypt.compareSync(password, user[0].password)
      if (!result) throw new CustomError(400, 'Логин и пароль неверны!')
      const tokens = await TokenService.generateTokens(user[0])
      const tokenInBase = await UsersModel.checkUserInTokenStore(user[0].id)
      if (tokenInBase.length > 0) {
        await UsersModel.updateToken(user[0].id, tokens.refreshToken)
      } else {
        await UsersModel.saveToken(user[0].id, tokens.refreshToken)
      }
      return tokens
    } catch (e) {
      throw e
    }
  }

  refresh = async (refreshToken: string) => {
    if (!refreshToken) throw new CustomError(401, 'Пользователь не авторизован')
    try {
      const userRToken = TokenService.validateRefreshToken(refreshToken)
      const dbRToken = await UsersModel.checkTokenInStore(refreshToken)
      if (!userRToken || !dbRToken) throw new CustomError(401, 'Пользователь не авторизован')
      const user: UserType = JSON.parse(JSON.stringify(userRToken))
      const tokens = await TokenService.generateTokens(user)
      return tokens
    } catch (e) {
      throw e
    }
  }
}
