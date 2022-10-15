const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/player', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
function check() {
  return new Promise((resolve, reject) => {
    mongoose.connection.on('open', (err) => {
      if (!err) {
        resolve()
      } else {
        reject(err)
      }
    })
  })
}
module.exports = check
