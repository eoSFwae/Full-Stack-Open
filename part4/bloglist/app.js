// App module imports everything needed to run the application
const express = require('express')
const mongoose = require('mongoose')
const config = require("./utils/config")
const app = express()
const mongoUrl = config.MONGODB_URI
const blogsRouter = require('./controllers/blogs')

// App is responsible for database connection
mongoose.connect(mongoUrl).then(() => console.log('Connected to MongoDB')).catch(e => console.error(e))

app.use(express.json())
app.use("/api/blogs", blogsRouter)



module.exports = app


