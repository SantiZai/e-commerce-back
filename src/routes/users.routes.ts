import { Router } from 'express'
import * as usersController from '../controllers/usersController'

const uRouter = Router()

uRouter.get('/users/', usersController.getUsers)
uRouter.get('/users/:id', usersController.getUser)
uRouter.post('/users/', usersController.createUser)
uRouter.delete('/users/:id', usersController.deleteUser)


//export default uRouter