import Student from '../entities/Student'
import { AppDataSource } from '../database/dataSource'
import { FindManyOptions, ILike, QueryFailedError } from 'typeorm'
import { getUniqueConstraintErrorMessage } from '../utils/getUniqueConstraintErrorMessage'

export type StudentProps = {
  ra: string
  name: string
  email: string
  cpf: string
}

export class StudentService {
  async executeCreate({ ra, name, email, cpf }: StudentProps): Promise<Student> {
    const repository = AppDataSource.getRepository(Student)

    try {
      const student = repository.create({ ra, name, email, cpf })

      await repository.save(student)

      return student
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('duplicate key value')) {
        const errorMessage = getUniqueConstraintErrorMessage(error)
        throw new Error(errorMessage)
      }

      throw error
    }
  }

  async executeGetAll(filters?: Partial<StudentProps>): Promise<Student[]> {
    const repository = AppDataSource.getRepository(Student)

    const findOptions: FindManyOptions<Student> = {}

    if (filters) {
        findOptions.where = {}

        if (filters.name) findOptions.where.name = ILike(`%${filters.name}%`)
        if (filters.email) findOptions.where.email = ILike(`%${filters.email}%`)
        if (filters.cpf) findOptions.where.cpf = ILike(`%${filters.cpf}%`)
        if (filters.ra) findOptions.where.ra = ILike(`%${filters.ra}%`)
    }

    const students = await repository.find(findOptions)

    return students
  }
}