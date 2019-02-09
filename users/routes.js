const {Router} = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const router = new Router()

router.post('/users', (req, res, next) => {
  const user = {
  	email: req.body.email,
  	password: bcrypt.hashSync(req.body.password, 10)
  }
  User
    .findOne({
        where: {
            email: req.body.email
        }
    })
    .then(someUser => {
        if(someUser) {
            res.status(422).send({
                message: 'User already exists'
            })
        } else if(req.body.password !== req.body.password_confirmation) {
            res.status(422).send({
                message: 'Confirm password should be equal to password'
            })
        } else if (!req.body.email ) {
            res.status(422).send({
                message: 'Fill in a valid email'
            })
        } else {
            User
              .create(user)
              .then(newUser => {
                  res.send({
                      id: newUser.id,
                      email: newUser.email,
                      password: newUser.password
                  })
              })
              .catch(err => {
                  console.error(err)
                  res.status(500).send({
                      message: 'Something went wrong'
                  })
            })
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).send({
            message: 'Something went wrong'
        })
    })
})

module.exports = router