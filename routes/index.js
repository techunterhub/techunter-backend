
const userRoute = require("./User.routes.js");
const bookmarkRoute = require("./bookmark.routes.js");
const eventRoutes = require("./event.routes.js");
const newsletter = require("./newsletter.js");
const event = require("./event.routes.js")


const routes = (app)=>{
    app.use("/api/v1/newsletter", newsletter);
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/bookmark", bookmarkRoute);
    app.use("/api/v1/event", eventRoutes);
    app.use("/api",event)
    app.get("/", (req, res) => {
      res.send("API is running on port " + 3000);
    });
}
  module.exports = routes