module.exports = (sequelize, Sequelize, DataTypes) => {
  const Seller = sequelize.define(
    "seller",
    {
      seller_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      store_name: {
        type: DataTypes.STRING(255),
      },
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Seller;
};
