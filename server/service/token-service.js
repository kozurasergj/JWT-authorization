import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model.js'

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken,
    }
  }

  validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (err) {
      return null
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (err) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await tokenModel.create({ userId, refreshToken })
    return token
  }

  async removeToken(refreshToken) {
    const tokenData = tokenModel.deleteOne({ refreshToken })
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = tokenModel.findOne({ refreshToken })
    return tokenData
  }
}

export default new TokenService()
