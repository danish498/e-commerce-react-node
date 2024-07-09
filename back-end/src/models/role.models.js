module.exports = (sequelize, Sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role", // Model name
    {
      // Model attributes
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      is_active: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.STRING,
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

  return Role;
};
