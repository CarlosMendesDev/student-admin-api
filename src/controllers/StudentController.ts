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
}
