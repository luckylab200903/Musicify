const express = require("express");
const app = express();
const connectDB=require("./config/connectDB")
const PORT = process.env.PORT || 5000;
const dotenv=require("dotenv")
const userRoutes=require("./routes/userRoutes")
const jwtpassport=require("./config/jwtpassportauth")
const songRoutes=require("./routes/songRoutes")
const playlistRoutes=require("./routes/playlistRoutes")
const cors=require("cors")
dotenv.config()
jwtpassport()
app.use(cors())
app.use(express.json())
app.use("/api",userRoutes)
app.use("/api",songRoutes)
app.use("/api",playlistRoutes)
try {
  app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`);
    console.log(process.env.MONGO_URL);
    connectDB(process.env.MONGO_URL)
  });
} catch (error) {
    console.log(error);
}
