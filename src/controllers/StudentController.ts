import { Request, Response } from 'express'
import { StudentService } from '../services/StudentService'

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
    const { ra, name, email, cpf } = request.body

    try {
      if (!ra && !name && !email && !cpf) {
        throw { status: 422, message: 'At least one parameter is required: {ra}, {name}, {email}, or {cpf}' }
      }

      const service = new StudentService()

      const updatedStudent = await service.executeUpdate(id, { ra, name, email, cpf })

      if (!updatedStudent) {
        throw { status: 404, message: 'Student not found' }
      }

      return response.json(updatedStudent)
    } catch (error) {
      if (error.status && error.message) return response.status(error.status).json({ error: error.message })

      return response.status(500).json({ error: 'Failed to update student' })
    }
  }
}
