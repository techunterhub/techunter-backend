const express = require("express");
const app = express();
const userRoute = require("./User.routes.js");
const bookmarkRoute = require("./bookmark.routes.js");
const eventRoutes = require("./getEvent.routes.js");
const newsletter = require("./newsletter.js");
 const registerEvent = require("./event.routes.js");

 const routes = ()=>{
    app.use("/api/v1/newsletter", newsletter);
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/bookmark", bookmarkRoute);
    app.use("/api/v1/event", eventRoutes);
    app.use("/api/v2/event",registerEvent)
    app.get("/", (req, res) => {
      res.send("API is running on port " + PORT);
    });
    
 }

module.exports = routes