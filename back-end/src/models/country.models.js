module.exports = (sequelize, Sequelize, DataTypes) => {
  const Countries = sequelize.define(
    "countries", // Model name
    {
      // Model attributes
      country_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country_code: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      // currency_code: {
      //   type: Sequelize.STRING(3),
      //   allowNull: false,
      // },
      phone_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // flag: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      // is_active: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: true,
      // },
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

  return Countries;
};
