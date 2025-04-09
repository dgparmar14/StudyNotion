const express = require("express");
const app = express();

const userRoute = require("./Routes/User");
const courseRoute = require("./Routes/Course");
const paymentRoute = require("./Routes/Payment");
const profileRoute = require("./Routes/Profile");
const contactRoute = require("./Routes/Contact");
const quizRoute = require("./Routes/Quiz");  
const categoryRequestRoute = require("./Routes/CategoryRequest")

const database = require("./Configs/databse");
const coockieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./Configs/Cloudinary");
const fileUpload = require("express-fileupload");

require("dotenv").config();

database.dbConnection();
cloudinaryConnect();
require("dotenv").config();
 const PORT = process.env.PORT || 4000;

 app.use(express.json());
 app.use(coockieParser());
 app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

 app.use("/api/v1/auth", userRoute);
 app.use("/api/v1/course", courseRoute);
 app.use("/api/v1/profile", profileRoute);
 app.use("/api/v1/payment", paymentRoute);
 app.use("/api/v1/reach", contactRoute);
 app.use("/api/v1/quiz", quizRoute); 
 app.use("/api/v1/categoryRequest", categoryRequestRoute);


 app.get('/', (req, res) => {
   res.sendStatus(200)
 })

 app.listen(PORT, ()=>{
    console.log(`App is listening on port no : ${PORT}`);
 })