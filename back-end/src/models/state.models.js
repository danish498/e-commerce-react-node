module.exports = (sequelize, Sequelize, DataTypes) => {
  const State = sequelize.define(
    "states", // Model name
    {
      // Model attributes
      state_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country_id: {
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

  return State;
};
