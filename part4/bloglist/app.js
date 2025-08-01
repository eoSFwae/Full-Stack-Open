// App module imports everything needed to run the application
const express = require('express')
const mongoose = require('mongoose')
const config = require("./utils/config")
const logger = require('./utils/logger')
const app = express()
const mongoUrl = config.MONGODB_URI
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

// App is responsible for database connection
mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('connected to MongoDB')
    })
        .catch((error)=>{
            logger.error('error connection to MongoDB:', error.message)
        })


app.use(express.json())
app.use(middleware.requestLogger)
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app


