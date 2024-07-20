const express = require("express");
const passport = require("passport");

const {
  songapicreate,
  songapiget,
  songgetartist,
  songgetsong,
  addSongToLiked,
  getLikedSongs,
} = require("../controller/songc");
const router = express.Router();

router
  .route("/create")
  .post(passport.authenticate("jwt", { session: false }), songapicreate);
router
  .route("/get/mysongs")
  .get(passport.authenticate("jwt", { session: false }), songapiget);

router
  .route("/get/artist/:artistId")
  .get(passport.authenticate("jwt", { session: false }), songgetartist);

router
  .route("/get/song/:songname")
  .get(passport.authenticate("jwt", { session: false }), songgetsong);

router
  .route("/liked/:songId")
  .post(passport.authenticate("jwt", { session: false }), addSongToLiked);
  router
  .route("/liked/songs")
  .get(passport.authenticate("jwt", { session: false }), getLikedSongs);
module.exports = router;
