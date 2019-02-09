const {Router} = require('express')
const {toJWT} = require('./jwt')
const User = require('../users/model')
const router = new Router()
const bcrypt = require('bcrypt')

router.post('/tokens', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  
  if (!email || !password) {
    res.status(400).send({
      message: 'Please try again'
    })
  } else {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(someUser => {
        if (!someUser) {
          return res.status(400).send({
            message: 'Please try again'
          })
        } else if (bcrypt.compareSync(req.body.password, someUser.password)) {
          res.send({
            token: toJWT({ userId: someUser.id })
          })
        } else {
          res.status(400).send({
            message: 'Please try again'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
  }
})

module.exports = router