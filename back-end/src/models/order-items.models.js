module.exports = (sequelize, Sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "order_item",
    {
      order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      order_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["pending", "processing", "shipped", "delivered"]],
            msg: "status must be pending, processing, shipped, or delivered",
          },
        },
      },
      payment_status: {
        type: Sequelize.ENUM("Pending", "Completed", "Failed"),
        allowNull: false,
        defaultValue: "Pending",
      },
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }


  );

  // OrderItem.sync({ alter: true })
  // .then(() => {
  //   console.log("Orders table updated!");
  // })
  // .catch((error) => console.log("This error occurred", error));

  return OrderItem;
};
