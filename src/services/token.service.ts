import jwt from 'jsonwebtoken'
import { UserType } from '../types/types'

class TokenService {
  generateTokens = async (user: UserType) => {
    const { id, alfirm, parent_id, id_log, roles } = user
    const accessToken = jwt.sign({ id, alfirm, parent_id, id_log, roles }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign({ id, alfirm, parent_id, id_log, roles }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '12h',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
  /*
  async saveToken(userId, refreshToken) {
      const tokenData = await tokenModel.findOne({user: userId})
      if (tokenData) {
          tokenData.refreshToken = refreshToken;
          return tokenData.save();
      }
      const token = await tokenModel.create({user: userId, refreshToken})
      return token;
  }

  async removeToken(refreshToken) {
      const tokenData = await tokenModel.deleteOne({refreshToken})
      return tokenData;
  }

  async findToken(refreshToken) {
      const tokenData = await tokenModel.findOne({refreshToken})
      return tokenData;
  }*/
}

export default new TokenService()
