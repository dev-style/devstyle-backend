const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db_connect.js");
const HeroSection = require("./routes/heroSection_route.js");
const Authentication = require("./routes/authentication_route.js");
const Goodie = require("./routes/goodie_route.js");
const Collection = require("./routes/collection_route.js");
const Size = require("./routes/size_route.js");
const Social = require("./routes/social_route.js");
const Ambassador = require("./routes/ambassador_route.js");
const Partner = require("./routes/partner_route.js");
const Announcement = require("./routes/announcement_route.js");
const Newsletter = require("./routes/newsletter_route.js");
const Order = require("./routes/order_route.js");
// const Admin = require("./controllers/admin_controller");
const bodyparser = require("body-parser");
/*****cors error protection and data parsing*****/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors());

// app.use("/admin", Admin);

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
//app.use(express.json({limit:"100mb"}));
//app.use(express.urlencoded({limit:"100mb"}));
//app.use(compression())

/*******endpoints******/
app.get("/", (req, res, next) => {
  res.status(200).json("Welcome to the otherside🙂");
});
app.use("/", Goodie);
app.use("/", HeroSection);
app.use("/", Collection);
app.use("/", Size);
app.use("/", Social);
app.use("/", Ambassador);
app.use("/", Partner);
app.use("/", Announcement);
app.use("/", Authentication);
app.use("/", Newsletter);
app.use("/", Order);

module.exports = app;
