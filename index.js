const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./users/routes')
const authenticationRouter = require('./authentication/routes')
const playlistRouter = require('./playlists/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(authenticationRouter)
  .use(usersRouter)
  .use(playlistRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))
