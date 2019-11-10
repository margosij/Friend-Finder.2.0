var getFriends = require('../data/friends.js')

module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    res.json(getFriends)
  })
    app.post('/api/friends', function (req, res) {

    var userdata = req.body
    var matches = []
    var lookForMatch = 0
    var matchFound = 0

    for (let i = 0; i < getFriends.length; i++) {
      var difference = 0
      for (let j = 0; j < getFriends[i].scores.length; j++) {
        getFriends[i].scores[j] = parseInt(getFriends[i].scores[j])
    
        userdata.scores[j] = parseInt(userdata.scores[j])
        difference += Math.abs(getFriends[i].scores[j] - userdata.scores[j])

      }
      matches.push(difference)

    }

    lookForMatch = Math.min.apply(Math, matches)
    matchFound = matches.indexOf(lookForMatch)
    getFriends.push(userdata)
    res.json(getFriends[matchFound])

  })
}
