import { Router } from 'express'
import StudentController from './controllers/StudentController'

const routes = Router()

routes.post('/student', new StudentController().handleCreate)

export default routes
