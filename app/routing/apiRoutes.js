// LOAD DATA
// ===============================================================================
var friendsData = require("../data/friends.js");

// ROUTING
// ===============================================================================
module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function (req, res) {
    let user = req.body;
    for (let i = 0; i < user.scores.length; i++) {
      let scoreInt = parseInt(user.scores[i]);
      user.scores[i] = scoreInt;
    }

    friendsData.push(user);
    let match = 0;
    let maxDifference = 40;

    for (let i = 0; i < friendsData.length - 1; i++) {

      let totalDif = 0;

      for (let j = 0; j < friendsData[i].scores.length; j++) {
        totalDif += Math.abs(friendsData[i].scores[j] - user.scores[j]);
      }

      if (totalDif < maxDifference) {
        maxDifference = totalDif;
        match = i;
      } else if (i === 0) {
        match = i;
        maxDifference = totalDif;
      }
    }

    res.json(friendsData[match]);
  });

};