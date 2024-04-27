import { Request, Response } from 'express'
import { StudentService } from '../services/StudentService'

export default class StudentController {
  async handleCreate(request: Request, response: Response) {
    const { ra, name, email, cpf } = request.body

    const service = new StudentService()

    try {
      const result = await service.executeCreate({ ra, name, email, cpf })

      return response.json(result)
    } catch (error) {
      return response.status(400).json(error?.message)
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

    const service = new StudentService()
    const students = await service.executeGetAll(filters)

    return response.json(students)
  }
}
