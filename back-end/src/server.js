const express = require("express");
const session = require("express-session");

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const path = require("path");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cors = require("cors");
const app = express();
const colors = require("colors");
require("dotenv").config();

const userRoutes = require("./routes/user.routes.js");
const productsRoutes = require("./routes/product.routes.js");
const sellerRoutes = require("./routes/seller.routes.js");
const wishlistRoutes = require("./routes/wishlist.routes.js");
const addToCartRoutes = require("./routes/add_to_cart.routes.js");
const registerDeviceRoutes = require("./routes/register_device.routes.js");
const reviewsRoutes = require("./routes/reviews.routes.js");
const addressRoutes = require("./routes/user-address.routes.js");
const orderRoutes = require("./routes/order.routes.js");
const paymentRoutes = require("./routes/payment.routes.js");

const { errorHandler } = require("./middlewares/error.middleware.js");
const { sequelize } = require("./models/index.js");

// Sync the models with the database

app.use(cors());

// SWAGGER

const swaggerFile = fs.readFileSync(
  path.resolve(__dirname, "./swagger.yaml"),
  "utf8"
);

const swaggerDocument = YAML.parse(
  swaggerFile?.replace(
    "- url: ${{server}}",
    `- url: ${process.env.PORTT || "http://localhost:8080"}/api/v1`
  )
);

//!

var myStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: "secret",
    store: myStore,
    resave: false,
    saveUninitialized: false,
  })
);

myStore.sync();

// Other routes and app.listen()...

// app.get("/api/v1/session", function (req, res, next) {
//   if (req.session.views) {
//     req.session.views++;
//     res.setHeader("Content-Type", "text/html");
//     res.write("<p>views: " + req.session.views + "</p>");
//     res.end();
//   } else {
//     req.session.views = 1;
//     res.end("Welcome to the session demo. Refresh!");
//   }
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", productsRoutes);
app.use("/api/v1", sellerRoutes);
app.use("/api/v1", wishlistRoutes);
app.use("/api/v1", addToCartRoutes);
app.use("/api/v1", registerDeviceRoutes);
app.use("/api/v1", reviewsRoutes);
app.use("/api/v1", addressRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// sequelize.sync().then(() => {
//   console.log("Database synced");
// });

app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: "none", // keep all the sections collapsed by default
    },
    customSiteTitle: "E Commerce",
  })
);

app.use(errorHandler);

console.log(colors.red(process.env.PORT));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.cyan(`Server is running on port ${PORT}`));
});
