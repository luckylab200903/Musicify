const mongoose=require("mongoose")

const connectDB=(URL)=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Sucessfully connected to the databse");
    }).catch((error)=>{
        console.log("error occured in connecting the database")
    })
}

module.exports= connectDB;