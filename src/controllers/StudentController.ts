import { Request, Response } from 'express'
import { StudentService } from '../services/StudentService'
import { QueryFailedError } from 'typeorm'

export default class StudentController {
  async handleCreate(request: Request, response: Response) {
    const { ra, name, email, cpf } = request.body

    try {
      if (!ra || !name || !email || !cpf) {
        throw { status: 422, message: 'Missing parameters: {ra}, {name}, {email}, and {cpf} are required' }
      }

      const service = new StudentService()

      const result = await service.executeCreate({ ra, name, email, cpf })

      return response.json(result)
    } catch (error) {
      if (error.status === 409) {
        return response.status(error.status).json({ error: 'Duplicate data.' })
      }

      if (error.status && error.message) return response.status(error.status).json({ error: error.message })

      return response.status(500).json({ error: 'Failed to create student.' })
    }
  }

  async handleGetAll(request: Request, response: Response) {
    const { name, email, cpf, ra } = request.query

    const filters = {
      name: name ? String(name) : undefined,
      email: email ? String(email) : undefined,
      cpf: cpf ? String(cpf) : undefined,
      ra: ra ? String(ra) : undefined
    }

    try {
      const service = new StudentService()

      const students = await service.executeGetAll(filters)

      return response.json(students)
    } catch (error) {
      return response.status(500).json({ error: 'Failed to search students.' })
    }
  }

  async handleDelete(request: Request, response: Response) {
    const { id } = request.params

    try {
      const service = new StudentService()

      await service.executeDelete(id)

      return response.status(204).send()
    } catch (error) {
      response.status(500).json({ error: 'Failed to delete student' })
    }
  }

  async handleUpdate(request: Request, response: Response) {
    const { id } = request.params
    const { name, email } = request.body

    try {
      if (!name && !email) {
        throw { status: 422, message: 'At least one parameter is required: {name} or {email}' }
      }

      const service = new StudentService()

      const updatedStudent = await service.executeUpdate(id, { name, email })

      if (!updatedStudent) {
        throw { status: 404, message: 'Student not found' }
      }

      return response.json(updatedStudent)
    } catch (error) {
      if (error.status === 409) {
        return response.status(error.status).json({ error: 'Duplicate data.' })
      }

      if (error.status && error.message) return response.status(error.status).json({ error: error.message })

      return response.status(500).json({ error: 'Failed to update student' })
    }
  }
}
