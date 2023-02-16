import { Router } from 'express'
import * as productsController from '../controllers/productsController'

const pRouter = Router()

pRouter.get('/products/', productsController.getProducts)
pRouter.get('/products/:id', productsController.getProduct)
pRouter.post('/products/', productsController.createProduct)
pRouter.delete('/products/:id', productsController.deleteProduct)
pRouter.patch('/products/:id', productsController.updateProduct)

export default pRouter