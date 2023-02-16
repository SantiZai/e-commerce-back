import { Router } from 'express'
import * as productsController from '../controllers/productsController'
import * as usersController from '../controllers/usersController'

const router = Router()

router.get('/products/', productsController.getProducts)
router.get('/products/:id', productsController.getProduct)
router.post('/products/', productsController.createProduct)
router.delete('/products/:id', productsController.deleteProduct)
router.patch('/products/:id', productsController.updateProduct)

router.get('/users/', usersController.getUsers)
router.get('/users/:id', usersController.getUser)
router.post('/users/', usersController.createUser)
router.delete('/users/:id', usersController.deleteUser)

export default router