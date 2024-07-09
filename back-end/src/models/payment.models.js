module.exports = (sequelize, Sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "payment", // Model name
    {
      // Model attributes
      payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.ENUM("Pending", "Completed", "Failed"),
        allowNull: false,
        defaultValue: "Pending",
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payment_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Payment;
};
