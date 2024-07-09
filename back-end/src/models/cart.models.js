module.exports = (sequelize, Sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "carts", // Model name
    {
      // Model attributes
      cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      session_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      // Options
      timestamps: true,
      under_scrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      undefined  }
  );

  return Cart;
};
