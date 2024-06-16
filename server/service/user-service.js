import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'
import UserModel from '../models/user-model.js'
import mailService from './mail-service.js'
import tokenService from './token-service.js'

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`User with the email ${email} already exists`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4()

    const user = await UserModel.create({ email, password: hashPassword, activationLink })
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    )

    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...UserDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest(`Incorrect activation link`)
    }
    user.isActivated = true
    await user.save()
  }
}

export default new UserService()
