const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const jwtpassport = require("./config/jwtpassportauth");
const songRoutes = require("./routes/songRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const cors = require("cors");

dotenv.config();

const path = require("node:path");

// __dirname is already available in CommonJS, no need to redefine it
console.log(__dirname);
jwtpassport();
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", songRoutes);
app.use("/api", playlistRoutes);

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});
app.listen(PORT, () => {
  connectDB(process.env.MONGODB_URI);
  console.log(`Server is running on port ${PORT}`);
});
