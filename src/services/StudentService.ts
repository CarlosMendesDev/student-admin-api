import Student from '../entities/Student'
import { AppDataSource } from '../database/dataSource'
import { FindManyOptions, ILike, QueryFailedError } from 'typeorm'

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
      if (error instanceof QueryFailedError) {
        throw { status: 409 }
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

    try {
      const students = await repository.find(findOptions)

      return students
    } catch (error) {
      throw error
    }
  }

  async executeDelete(id: string): Promise<void> {
    const repository = AppDataSource.getRepository(Student)

    try {
      await repository.delete(id)
    } catch (error) {
      throw error
    }
  }

  async executeUpdate(id: string, data: Partial<StudentProps>): Promise<Student | null> {
    const repository = AppDataSource.getRepository(Student)

    try {
      const student = await repository.findOneOrFail({ where: { id } })

      const updatedStudent = await repository.save({ ...student, ...data })

      return updatedStudent
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw { status: 409 }
      }

      throw error
    }
  }
}
