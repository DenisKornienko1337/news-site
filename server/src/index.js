const express = require('express')
const enableWs = require('express-ws')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config/config')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoDBStore = require('connect-mongodb-session')(session)
const path = require('path')

enableWs(app)

const store = new MongoDBStore({
  uri: config.dbURL,
});

app.use(cors({
  origin: config.clientHost,
  credentials: true
}))
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
//   res.setHeader('Access-Control-Allow-Credentials', 'true')
//   next();
// });
// Routes
//app.use(cookieParser)

const postRoutes = require('./routes/posts')
const categoryRoutes = require('./routes/category')
const usersRoutes = require('./routes/users')
const chatRoutes = require('./routes/chat')

// test task Routes
// const userRoutes = require('./routes/maks/users')
// const projectRoutes = require('./routes/maks/projects')
// Set default configs
mongoose.Promise = global.Promise
app.use(morgan('combined'))
app.use(bodyParser.json({limit: '100mb'}))
//Set middleware
app.use(session({
  secret: 'production',
  resave: false,
  saveUninitialized: false,
  store: store
}))

// Set Routes
app.use('/public', express.static(path.resolve(__dirname+'/public').replace(/\\/g, '/')))

app.use('/posts', postRoutes)
app.use('/categories', categoryRoutes)
app.use('/users', usersRoutes)
app.use('/chat', chatRoutes)


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