const expressAsyncHandler = require("express-async-handler");
const Playlist = require("../model/playlistModel");
const User = require("../model/userModel");
const Song = require("../model/songModel");
const createPlaylist = expressAsyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { name, thumbnail, songs } = req.body;
  if (!name || !thumbnail || !songs) {
    return res.status(301).json({ err: "insufficient data" });
  }
  const playlist = await Playlist.create({
    name,
    thumbnail,
    songs,
    owner: currentUser,
    collaborators: [],
  });

  return res.status(200).json(playlist);
});

const getplaylistbyid = expressAsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlistexis = await Playlist.findOne({ _id: playlistId }).populate("songs")

  if (!playlistexis) {
    return res.status(404).json({ msg: "no playlist exists" });
  }

  return res.status(201).json(playlistexis);
});

const getartistplaylist = expressAsyncHandler(async (req, res) => {
  const { artistId } = req.params;

  const artist = await User.findOne({ _id: artistId })

  if (!artist) {
    res.status(401).json({ msg: "no artist exists" });
  }
  const playlistexits = await Playlist.find({ owner: artistId });
  if (!playlistexits) {
    res.status(401).json({ msg: "no playlist exists with this artist" });
  }

  return res.status(204).json(playlistexits);
});

const addsongtoplaylist = expressAsyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { playlistId, songId } = req.body;
  const playlist = await Playlist.findOne({
    _id: playlistId,
  });

  if (!playlist) {
    return res
      .status(304)
      .json({ err: "playlist with given id does not exist" });
  }


  if (
    !playlist.owner.equals(currentUser._id) &&
    !playlist.collaborators.includes(currentUser._id)
  ) {
    return res.status(405).json({ err: "Not allowed to edit the playlist" });
  }

  const song = await Song.findOne({ _id: songId });

  // Fix placement of return statement for the song not found case
  if (!song) {
    return res.status(304).json({ err: "song does not exist" });
  }

  // Check if the song can be added
  playlist.songs.push(songId);
  await playlist.save();
  return res.status(200).json(playlist);
});

const getplaylistbyME = expressAsyncHandler(async (req, res) => {
  const artistId = req.user;

  const playlistexits = await Playlist.find({ owner: artistId }).populate("owner");
  
  if (playlistexits.length === 0) {
    return res.status(401).json({ msg: "No playlists exist with this artist" });
  }

  return res.status(200).json({ data: playlistexits });
});


module.exports = {
  getartistplaylist,
  addsongtoplaylist,
  createPlaylist,
  getplaylistbyid,
  getplaylistbyME,
};
