module.exports = (sequelize, Sequelize, DataTypes) => {
  const City = sequelize.define(
    "cities", // Model name
    {
      // Model attributes
      city_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      // created_by: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
      // created_at: {
      //   type: Sequelize.DATE,
      //   defaultValue: Sequelize.NOW,
      // },
    },
    {
      // Options
      timestamps: false,
      under_scrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      undefined,
    }
  );

  return City;
};
