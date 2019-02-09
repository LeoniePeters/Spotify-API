const { Router } = require('express')
const Playlist = require('./model')

const router = new Router()

router.post('/playlists', (req, res, next) => {
  Playlist
    .create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})

module.exports = router