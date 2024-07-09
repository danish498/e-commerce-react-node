module.exports = (sequelize, Sequelize, DataTypes) => {
  const Order = sequelize.define(
    "orders", // Model name
    {
      // Model attributes
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_number: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      extra_charges: {
        type: DataTypes.STRING,
      },
      payment_status: {
        type: Sequelize.ENUM("Pending", "Completed", "Failed"),
        allowNull: false,
        defaultValue: "Pending",
      },
      payment_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Add other order details like total price, status, etc.
    },
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Order.sync({ alter: true })
  //   .then(() => {
  //     console.log("Orders table updated!");
  //   })
  //   .catch((error) => console.log("This error occurred", error));

  return Order;
};
