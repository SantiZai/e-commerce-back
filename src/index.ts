import database from './app'
import { PORT } from './config'

database.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}/api/`)
})