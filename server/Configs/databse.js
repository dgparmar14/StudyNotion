const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnection = ()=>{
    
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology : true
    })
    .then( () => {
            console.log("Database connected successfully");
        }
    )
    .catch((err)=>{
        console.log("Error occured in connection");
        console.error(err);
        process.exit(1);
    })
} 