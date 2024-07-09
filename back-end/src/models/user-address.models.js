module.exports = (sequelize, Sequelize, DataTypes) => {
  const UserAddress = sequelize.define(
    "user_address", // Model name
    {
      // Model attributes
      user_address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING(20),
      },
      phone_number: {
        type: DataTypes.STRING(20),
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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

  return UserAddress;
};
