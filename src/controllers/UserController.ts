import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import jwt from 'jsonwebtoken'

export default class UserController {
  async handleRegister(req: Request, res: Response) {
    const { name, username, password } = req.body

    try {
      if (!name || !username || !password) {
        throw { status: 422, message: 'Missing parameters: {name}, {username}, and {password} are required' }
      }

      const userService = new UserService()

      const user = await userService.executeCreate({ name, username, password })

      delete user.password

      res.status(201).json(user)
    } catch (error) {
      if (error.status && error.message) return res.status(error.status).json({ error: error.message })

      return res.status(500).json({ error: 'Failed to register user.' })
    }
  }

  async handleLogin(req: Request, res: Response) {
    const { username, password } = req.body

    try {
      const userService = new UserService()

      const user = await userService.findUserByUsername(username)

      if (!user) {
        throw { status: 401, message: 'Invalid credentials' }
      }

      const passwordMatch = await userService.verifyPassword(user, password)

      if (!passwordMatch) {
        throw { status: 401, message: 'Invalid credentials' }
      }

      const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' })

      res.json({ accessToken })
    } catch (error) {
      if (error.status && error.message) return res.status(error.status).json({ error: error.message })

      return res.status(500).json({ error: 'Failed to authenticate user.' })
    }
  }
}
