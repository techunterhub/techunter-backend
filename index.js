const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connect");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const compression = require("compression");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


const allowedOrigins = ['https://events.techunterhub.com', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, origin); 
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


connectDB(); 
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const userRoute = require("./routes/User.routes.js");
const bookmarkRoute = require("./routes/bookmark.routes.js");
const eventRoutes = require("./routes/getEvent.routes.js");
const newsletter = require("./routes/newsletter.js");
 
app.use("/api/v1/newsletter", newsletter);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/bookmark", bookmarkRoute);
app.use("/api/v1/event", eventRoutes);

app.get("/", (req, res) => {
  res.send("API is running on port " + PORT);
});

app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
