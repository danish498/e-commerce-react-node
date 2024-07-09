const Sequelize = require("sequelize");
const DataTypes = require("sequelize");
const colors = require("colors");
const path = require("path");
const fs = require("fs");

const sequelize = new Sequelize("e-comm", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log(colors.blue("Models synchronized successfully."));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Synchronize models with the database

const db = {};

db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
db.sequelize = sequelize;

db.User = require("./user.models.js")(sequelize, Sequelize, DataTypes);
db.Order = require("./order.models.js")(sequelize, Sequelize, DataTypes);
db.Role = require("./role.models.js")(sequelize, Sequelize, DataTypes);

db.Product = require("./product.models.js")(sequelize, Sequelize, DataTypes);
db.ShoppingSession = require("./shopping-session.models.js")(
  sequelize,
  Sequelize,
  DataTypes
);
db.Category = require("./category-models.js")(sequelize, Sequelize, DataTypes);
db.Seller = require("./seller.models.js")(sequelize, Sequelize, DataTypes);
db.Payment = require("./payment.models.js")(sequelize, Sequelize, DataTypes);
db.Cart = require("./cart.models.js")(sequelize, Sequelize, DataTypes);
db.Review = require("./review.models.js")(sequelize, Sequelize, DataTypes);
db.CartItem = require("./card-item.models.js")(sequelize, Sequelize, DataTypes);
db.OrderItem = require("./order-items.models.js")(
  sequelize,
  Sequelize,
  DataTypes
);
db.UserAddress = require("./user-address.models.js")(
  sequelize,
  Sequelize,
  DataTypes
);

db.Country = require("./country.models.js")(sequelize, Sequelize, DataTypes);
db.State = require("./state.models.js")(sequelize, Sequelize, DataTypes);
db.City = require("./city.models.js")(sequelize, Sequelize, DataTypes);

//! RELATION

db.User.hasMany(db.Order, { foreignKey: "user_id" });
db.Order.belongsTo(db.User, { foreignKey: "user_id" });

db.Role.hasMany(db.User, { foreignKey: "role_id" });
db.User.belongsTo(db.Role, { foreignKey: "role_id" });

db.Role.hasMany(db.Seller, { foreignKey: "role_id" });
db.Seller.belongsTo(db.Role, { foreignKey: "role_id" });

db.User.hasMany(db.UserAddress, { foreignKey: "user_id" });
db.UserAddress.belongsTo(db.User, { foreignKey: "user_id" });

db.User.belongsToMany(db.Product, {
  through: "wishlist_product",
  foreignKey: "user_id",
  otherKey: "product_id",
});

db.User.hasOne(db.Cart, { foreignKey: "user_id" });
db.Cart.belongsTo(db.User, { foreignKey: "user_id" });

db.Product.belongsToMany(db.User, {
  as: "wishlist",
  through: "wishlist_product",
  foreignKey: "product_id",
  otherKey: "user_id",
});

db.User.belongsToMany(db.Product, {
  as: "wishlist",
  through: "wishlist_product",
  foreignKey: "user_id",
  otherKey: "product_id",
});

db.User.hasMany(db.Review, {
  foreignKey: "user_id",
});

db.Review.belongsTo(db.User, {
  foreignKey: "user_id",
});

/** PRODUCT */

db.Seller.hasMany(db.Product, {
  foreignKey: "seller_id",
  as: "product",
});

db.Product.belongsTo(db.Seller, {
  foreignKey: "seller_id",
  as: "seller",
});

db.Product.hasMany(db.Review, {
  foreignKey: "product_id",
  as: "reviews",
});

db.Review.belongsTo(db.Product, {
  foreignKey: "product_id",
});

db.Product.hasMany(db.CartItem, {
  foreignKey: "product_id",
});

db.CartItem.belongsTo(db.Product, {
  foreignKey: "product_id",
  as: "cartProducts",
});

db.Product.hasMany(db.OrderItem, {
  foreignKey: "product_id",
});

db.OrderItem.belongsTo(db.Product, {
  foreignKey: "product_id",
});

db.Product.hasMany(db.OrderItem, {
  foreignKey: "product_id",
  as: "orderItems",
});

db.OrderItem.belongsTo(db.Product, {
  foreignKey: "product_id",
  // as: "product",
});

/** CATEGORY */

db.Category.hasMany(db.Product, {
  foreignKey: "category_id",
  as: "products",
});

db.Product.belongsTo(db.Category, {
  foreignKey: "category_id",
  as: "category",
});

/** CART  */

db.Cart.hasMany(db.CartItem, {
  foreignKey: "cart_id",
  as: "cartItems",
});

db.CartItem.belongsTo(db.Cart, {
  foreignKey: "cart_id",
  as: "carts",
});

/**ORDER */

db.Order.hasMany(db.OrderItem, {
  foreignKey: "order_id",
  as: "orderItem",
});

// OrderItem belongs to Order
// OrderItem.belongsTo(Order, {
//   foreignKey: "order_id",
//   // as: "order",
// });

//! payment

db.Order.hasMany(db.Payment, {
  foreignKey: "order_id",
});

db.Payment.belongsTo(db.Order, {
  foreignKey: "order_id",
});

/** Country list */

db.Country.hasMany(db.State, { foreignKey: "country_id" });
db.State.belongsTo(db.Country, { foreignKey: "country_id" });

db.State.hasMany(db.City, { foreignKey: "state_id" });
db.City.belongsTo(db.State, { foreignKey: "state_id" });

/** User Address */

db.Country.hasMany(db.UserAddress, { foreignKey: "country_id" });
db.UserAddress.belongsTo(db.Country, { foreignKey: "country_id" });

db.State.hasMany(db.UserAddress, { foreignKey: "state_id" });
db.UserAddress.belongsTo(db.State, { foreignKey: "state_id" });

db.City.hasMany(db.UserAddress, { foreignKey: "city_id" });
db.UserAddress.belongsTo(db.City, { foreignKey: "city_id" });

/** */

db.Country.hasMany(db.UserAddress, {
  foreignKey: "country_id",
  as: "AddressesInCountry",
});
db.UserAddress.belongsTo(db.Country, {
  foreignKey: "country_id",
  as: "CountryOfAddress",
});

db.State.hasMany(db.UserAddress, {
  foreignKey: "state_id",
  as: "AddressesInState",
});
db.UserAddress.belongsTo(db.State, {
  foreignKey: "state_id",
  as: "StateOfAddress",
});

db.City.hasMany(db.UserAddress, {
  foreignKey: "city_id",
  as: "AddressesInCity",
});
db.UserAddress.belongsTo(db.City, {
  foreignKey: "city_id",
  as: "CityOfAddress",
});

/** */

const getModelMethods = (model) => {
  const instance = model.build();
  return {
    instanceMethods: Object.getOwnPropertyNames(
      Object.getPrototypeOf(instance)
    ).filter(
      (method) =>
        method !== "constructor" && typeof instance[method] === "function"
    ),
    classMethods: Object.getOwnPropertyNames(model).filter(
      (method) => typeof model[method] === "function"
    ),
  };
};

const generateModelMethodsFile = () => {
  const modelMethods = {
    User: getModelMethods(db.User),
    Product: getModelMethods(db.Product),
    Order: getModelMethods(db.Order),
    OrderItem: getModelMethods(db.OrderItem),
    Category: getModelMethods(db.Category),
    Review: getModelMethods(db.Review),
    Cart: getModelMethods(db.Cart),
    CartItem: getModelMethods(db.CartItem),
    Payment: getModelMethods(db.Payment),
    UserAddress: getModelMethods(db.UserAddress),
  };

  fs.writeFileSync(filePath, JSON.stringify(modelMethods, null, 2), "utf-8");
  console.log(`Model methods written to ${filePath}`);
};

const filePath = path.join(__dirname, "modelMethods.json");
if (!fs.existsSync(filePath)) {
  // ! RUN ONCE WHEN IT NEEDED To know about methods
  generateModelMethodsFile();
}

(async () => {
  try {
    await sequelize.sync({ force: false }); // Set force to true for development, false for production
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize models with the database:", error);
  }
})();

module.exports = { sequelize };
module.exports = db;
