const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config/config')
const session = require('express-session')
// Routes
const postRoutes = require('./routes/posts')
const categoryRoutes = require('./routes/category')
const usersRoutes = require('./routes/users')
// test task Routes
// const userRoutes = require('./routes/maks/users')
// const projectRoutes = require('./routes/maks/projects')
// Set default configs
mongoose.Promise = global.Promise
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//Set middleware
app.use(session({
  secret: 'production',
  resave: false,
  saveUninitialized: false
}))
// Set Routes
app.use('/posts', postRoutes)
app.use('/categories', categoryRoutes)
app.use('/users', usersRoutes)

// test task Set Routes
// app.use('/users', userRoutes)
// app.use('/projects', projectRoutes)
// Connect to database
mongoose.connect(config.dbURL, config.dbOptions)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))