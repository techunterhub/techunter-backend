
require('dotenv').config();

const express = require("express");
const cors = require("cors");
// const connectDB = require("./config/connect");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const limit = require("express-rate-limit");
const routes = require("./routes/index");


const limiter = limit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests, please try again after a minute.",
});

// Apply rate limiting to all requests
const app = express();
app.use(limiter);
const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  "https://events.techunterhub.com",
  "http://localhost:5173",
  "https://techunterhub.com",
];
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// connectDB();
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

routes(app);

app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
  );
});

