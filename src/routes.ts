import { Router } from 'express'
import StudentController from './controllers/StudentController'

const routes = Router()

routes.post('/student', new StudentController().handleCreate)
routes.get('/students', new StudentController().handleGetAll)
routes.delete('/student/:id', new StudentController().handleDelete)

export default routes
