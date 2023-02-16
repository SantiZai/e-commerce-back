import { Router } from 'express'
import * as usersController from '../controllers/usersController'

const uRouter = Router()

uRouter.get('/', usersController.getUsers)
uRouter.get('/:id', usersController.getUser)
uRouter.post('/', usersController.createUser)
uRouter.delete('/:id', usersController.deleteUser)


export default uRouter