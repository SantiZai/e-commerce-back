import database from './app'

database.listen(database.get('PORT'), () => {
    console.log(`Server on http://localhost:${database.get('PORT')}/api/products`)
})