const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/authentication")
const courseRoute = require("./routes/course")
const lectureRoute = require("./routes/lecture")
const blogRoute = require("./routes/blog")
const cors = require("cors");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
  
app.use(cors());
app.use(express.json());
app.use(express.text());

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/courses", courseRoute)
app.use("/api/lectures", lectureRoute)
app.use("/api/blogs", blogRoute)

app.listen(5000, () => {
  console.log("Backend server is running!");
});