import { Router } from 'express'
import StudentController from './controllers/StudentController'
import UserController from './controllers/UserController'
import { authenticateToken } from './middleware/authMiddleware'

const routes = Router()

routes.post('/register', new UserController().handleRegister)
routes.post('/login', new UserController().handleLogin)

routes.use(authenticateToken)

routes.post('/student', new StudentController().handleCreate)
routes.put('/student/:id', new StudentController().handleUpdate)
routes.get('/students', new StudentController().handleGetAll)
routes.delete('/student/:id', new StudentController().handleDelete)

export default routes
