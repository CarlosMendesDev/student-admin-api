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

  async handleDelete(request: Request, response: Response) {
    const { id } = request.params

    if (!id) {
      return response.status(400).json({ error: 'ID não fornecido' })
    }

    const service = new StudentService()

    try {
      await service.executeDelete(id)

      return response.status(204).send()
    } catch (error) {
      return response.status(500).json({ error: 'Não foi possível excluir o estudante' })
    }
  }

  async handleUpdate(request: Request, response: Response) {
    const { id } = request.params
    const { ra, name, email, cpf } = request.body

    if (!id) {
      return response.status(400).json({ error: 'ID não fornecido' })
    }

    const service = new StudentService()

    try {
      const updatedStudent = await service.executeUpdate(id, { ra, name, email, cpf })

      if (!updatedStudent) {
        return response.status(404).json({ error: 'Estudante não encontrado' })
      }

      return response.json(updatedStudent)
    } catch (error) {
      return response.status(500).json({ error: 'Não foi possível atualizar o estudante' })
    }
  }
}
