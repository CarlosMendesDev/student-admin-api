import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import jwt from 'jsonwebtoken'

export default class UserController {
  async handleRegister(req: Request, res: Response) {
    const { name, username, password } = req.body

    const userService = new UserService()

    try {
      const user = await userService.executeCreate({ name, username, password })

      delete user.password

      res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ error: 'Registration failed' })
    }
  }

  async handleLogin(req: Request, res: Response) {
    const { username, password } = req.body

    const userService = new UserService()

    const user = await userService.findUserByUsername(username)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const passwordMatch = await userService.verifyPassword(user, password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '2m' })

    res.json({ accessToken })
  }
}
