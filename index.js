require('dotenv').config()
const express = require('express')
const app = express()

const Sequelize = require('sequelize')

const userRoutes = require('./routes/userRoutes')

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.json({ message: "oi Express!" })
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

const sequelize = new Sequelize('teste', DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });

sequelize.authenticate().then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!")
    app.listen(3000)
}).catch((err) => console.log(err))
