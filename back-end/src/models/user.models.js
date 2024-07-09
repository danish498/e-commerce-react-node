module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "users", // Model name
    {
      // Model attributes
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      role_id: {
        type: DataTypes.INTEGER,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
      },

      password: {
        type: DataTypes.STRING(255),
      },

      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING, // Can be adjusted based on storage location
        allowNull: true, // Allow users without a profile image
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

  return User;
};
