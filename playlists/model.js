const Sequelize = require('sequelize')
const sequelize = require('../db')

const Playlist = sequelize.define('playlists', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  songId: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'playlists'
})


module.exports = Playlist