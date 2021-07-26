import { JsonController, Post, Get, Body, Res, CookieParam } from 'routing-controllers'
import { UsersService } from './users.service'
import UsersModel from './users.model'
import { UsersParamsType } from '../types/types'
import { CustomError } from '../services/error.service'
import 'reflect-metadata'

@JsonController('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService = new UsersService()
  }

  @Post('/login')
  async login(@Res() response: any, @Body() user: UsersParamsType) {
    const { login, password } = user
    if (!login || !password) throw new CustomError(400, `Логин и пароль не верны!`)
    try {
      const tokens = await this.usersService.auth(login, password)
      response.cookie('refreshToken', tokens.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
      return response.json(tokens)
    } catch (e) {
      throw e
    }
  }

  @Post('/logout')
  async logout(@Res() response: any, @CookieParam('refreshToken') refreshToken: string) {
    try {
      UsersModel.logout(refreshToken)
      response.clearCookie('refreshToken')
      return response.json('exit')
    } catch (e) {
      throw e
    }
  }

  @Get('/refresh')
  async refresh(@Res() res: any, @CookieParam('refreshToken') refreshToken: string) {
    try {
      const tokens = await this.usersService.refresh(refreshToken)
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(tokens)
    } catch (e) {
      throw e
    }
  }
}
