
const express  = require("express")
const cors  = require("cors")
const connectDB  = require("./config/connect")
const cookieParser  = require("cookie-parser")
const fileUpload  = require("express-fileupload")
const bodyParser  = require("body-parser")
const compression  = require("compression")
const dotenv  = require("dotenv")
dotenv.config();


connectDB()


const userRoute = require("./routes/User.routes.js")
const bookmarkRoute = require("./routes/bookmark.routes.js")

const app = express();
const PORT = process.env.PORT || 8000;

// origin: ["http://localhost:3000", "https://www.losheaven.com","https://www.cpannel.losheaven.com"],
// methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
// allowedHeaders: ["Content-Type", "Authorization"]
app.use(cors());


app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.use(compression());

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/bookmark", bookmarkRoute);

app.get("/", (req, res) => {
  res.send("Api is running on port" + PORT);
});

app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
