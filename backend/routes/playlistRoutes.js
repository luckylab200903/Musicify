const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  getplaylistbyid,
  createPlaylist,
  getartistplaylist,
  addsongtoplaylist,
  getplaylistbyME,
} = require("../controller/playlist");

router
  .route("/playlist/create")
  .post(passport.authenticate("jwt", { session: false }), createPlaylist);

router
  .route("/get/playlist/:playlistId")
  .get(passport.authenticate("jwt", { session: false }), getplaylistbyid);

router
  .route("/get/artist:artistId")
  .post(passport.authenticate("jwt", { session: false }), getartistplaylist);


router
  .route("/get/me")
  .get(passport.authenticate("jwt", { session: false }), getplaylistbyME);

router
  .route("/add/song")
  .post(passport.authenticate("jwt", { session: false }), addsongtoplaylist);
module.exports = router;
