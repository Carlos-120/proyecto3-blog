const express = require('express')
const postRouter = require('./posts/posts.router')
const db = require('./utils/database')
const app = express()
app.use(express.json())

db.authenticate()
    .then(() => {
        console.log('Las credenciales de la base de datos son correctas')
    })
    .catch((err) => {
        console.log(err) //! Errores de autenticacion (contraseña, usuario o hosts)
    })

db.sync()
    .then(() => {
        console.log('La base de datos del virus ha sido actualizada')
    })
    .catch(err => {
        console.log(err) //! error en las tablas, propiedades, etc
    })


app.get('/', (req, res) => {
    res.json({
        message: 'Server Ok!',
        routes: {
            products: 'http://localhost:9000/api/v1/products'
        }
    })
})

app.use('/api/v1', postRouter)

app.listen(9000, () => {
    console.log('Server started at port 9000')
})
module.exports = app
