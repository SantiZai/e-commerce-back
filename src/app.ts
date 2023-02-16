import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes/products.routes'
//import usersRoutes from './routes/users.routes'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', routes)
//app.use('/api', usersRoutes)

app.set('PORT', 3000)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' })
})

export default app