module.exports = (sequelize, Sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category", // Model name
    {
      // Model attributes
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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

  return Category;
};
