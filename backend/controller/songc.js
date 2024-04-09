const expressAsyncHandler = require("express-async-handler");
const Song = require("../model/songModel");
const User = require("../model/userModel");
const songapicreate = expressAsyncHandler(async (req, res) => {
  const { name, thumbnail, track } = req.body;
  const artist = req.user._id;
  if (!name || !thumbnail || !track) {
    res.status(400).json({ error: "Please fill all the fields" });
    return;
  }

  const song = await Song.create({
    name,
    thumbnail,
    track,
    artist,
  });

  return res.status(201).json(song);
});

const songapiget = expressAsyncHandler(async (req, res) => {
  const currentUser = req.user;
  const id_artist = currentUser._id;

  try {
    const songs = await Song.find({ artist: id_artist }).populate("artist");
    console.log("Found songs:", songs);


    return res.status(203).json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const songgetartist = expressAsyncHandler(async (req, res) => {
  const { artistId } = req.params;
  if (!artistId) {
    throw new Error("please provide artiest id");
  }

  const artist = await User.find({ id: artistId });
  if (!artist) {
    res.status(401).json({ msg: "user does not exist" });
  }

  const songs = await Song.find({ artist: artistId });
  return res.status(200).json(songs);
});
//router
//.route("/get/song/:songname")
//.get(passport.authenticate("jwt", { session: false }), songgetsong);
//
//
const songgetsong = expressAsyncHandler(async (req, res) => {
  const { songname } = req.params;

  if (!songname) {
    throw new Error("Please provide song name");
  }

  try {
    const songs = await Song.find({
      name: { $regex: new RegExp(songname, "i") },
    }).populate("artist");

    if (songs.length === 0) {
      return res
        .status(404)
        .json({ msg: "No songs found matching the provided text" });
    }

    return res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const addSongToLiked = expressAsyncHandler(async (req, res) => {
  const { songId } = req.params;

  if (!songId) {
    return res.status(400).json({ error: "Please provide a song ID" });
  }

  try {
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    const user = req.user;

    if (!user || !user.likedSongs) {
      return res.status(500).json({ error: "User or likedSongs undefined" });
    }

    if (user.likedSongs.includes(songId)) {
      return res
        .status(400)
        .json({ error: "Song is already in the liked list" });
    }

    user.likedSongs.push(songId);
    await user.save();

    return res.status(200).json({ message: "Song added to liked list" });
  } catch (error) {
    console.error("Error adding song to liked list:", error);
    return res.status(500).json({ error: error.message });
  }
});

// const getLikedSongs = expressAsyncHandler(async (req, res) => {
//   const user = req.user;
//   if (!user) {
//     res.status(401).send({
//       msg: "user does not exist",
//     });
//   }
//   const id = user._id;
//   const songs = await User.findById({ id: _id });
//   return res.status(201).send({
//     songs
//   })

// });
const getLikedSongs = expressAsyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      msg: "User does not exist",
    });
  }

  const userId = user._id;

  try {
    // Correct the query to use { _id: userId }
    const userWithLikedSongs = await User.findById(userId).populate(
      "likedSongs"
    );

    if (!userWithLikedSongs) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const likedSongs = userWithLikedSongs.likedSongs;

    return res.status(200).json({
      songs: likedSongs,
    });
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = {
  songapicreate,
  songapiget,
  songgetartist,
  songgetsong,
  addSongToLiked,
  getLikedSongs,
};
