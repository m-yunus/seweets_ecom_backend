const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors=require('cors');
const port = process.env.PORT || 8080;


dotenv.config();
app.use(bodyParser.json());
app.use("/public/slider", express.static(__dirname + "/public/slider"));
app.use(cors());
//routes
app.use(`${process.env.api_url}`, userRoutes);

connectDB();
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
