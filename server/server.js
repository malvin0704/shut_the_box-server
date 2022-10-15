const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const userRouter = require('./router/userRouter')
let check = require('./dbConnection/db.js')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    name: '_id',
    secret: 'shutthebox',
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/session_container',
      touchAfter: 1000 * 60 * 60 * 24,
    }),
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
)
check()
  .then(() => {
    app.use(userRouter)
    app.listen(3000, (err) => {
      if (!err) console.log('server started successfully')
      else console.log(err)
    })
  })
  .catch((msg) => {
    console.log(msg)
  })
