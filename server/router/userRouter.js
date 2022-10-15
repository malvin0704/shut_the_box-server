const e = require('express')
const { Router, response } = require('express')
const router = new Router()
const playersModel = require('../model/playerModel')
const cookieParser = require('cookie-parser')
router.use(cookieParser())
router.post('/register', (req, res) => {
  const { username, password, score } = req.body
  playersModel.findOne({ username }, (err, data) => {
    if (data) {
      res.status(400)
      res.send('Username already used')
    } else {
      playersModel.create({ username, password, score }, (err, data) => {
        if (!err) {
          res.send('successfully')
        } else {
          res.send('Network is unsteable,try it later')
        }
      })
    }
  })
})
router.post('/login', (req, res) => {
  const { username, password } = req.body
  playersModel.findOne({ username, password }, (err, data) => {
    if (err) {
      res.send('Network is unsteable, try it later')
      return
    }
    if (data) {
      res.header('Access-Control-Allow-Credentials', 'true')
      res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
      res.header(
        'Access-Control-Allow-Methods',
        'PUT,POST,GET,DELETE,OPTIONS,HEAD'
      )
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type-Length,Authorization,Accept,X-Request'
      )
      req.session._id = data._id.toString()
      res.send('Login successfully')
      return
    } else {
      res.status(400)
      res.send('Username and Password do not match')
    }
  })
})
router.post('/game', (req, res) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,HEAD')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type-Length,Authorization,Accept,X-Request'
  )
  let { _id } = req.session
  console.log(_id)
  if (_id) {
    playersModel.findOne({ _id }, (err, data) => {
      if (!err && data) {
        res.send(data)
        return
      } else {
        res.redirect('http://localhost:3001/login')
      }
    })
  }
})
router.get('/score', (req, res) => {
  const { username, score, password } = req.query
  playersModel.updateOne(
    { username },
    { username, password, score },
    (err, data) => {
      if (!err) console.log(data)
      else console.log(err)
    }
  )
})
module.exports = router
