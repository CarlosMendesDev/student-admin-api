import { AppDataSource } from '../database/dataSource'
import User from '../entities/User'
import bcrypt from 'bcrypt'

export type UserProps = {
  name: string
  username: string
  password: string
}

export class UserService {
  async executeCreate({ name, username, password }: UserProps): Promise<User> {
    const repository = AppDataSource.getRepository(User)

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = repository.create({ name, username, password: hashedPassword })

      await repository.save(user)

      return user
    } catch (error) {
      return error
    }
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    const repository = AppDataSource.getRepository(User)

    return repository.findOne({ where: { username } })
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password)
  }
}
