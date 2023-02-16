import { Router } from 'express'
import * as productsController from '../controllers/productsController'

const pRouter = Router()

pRouter.get('/', productsController.getProducts)
pRouter.get('/:id', productsController.getProduct)
pRouter.post('/', productsController.createProduct)
pRouter.delete('/:id', productsController.deleteProduct)
pRouter.patch('/:id', productsController.updateProduct)

export default pRouter