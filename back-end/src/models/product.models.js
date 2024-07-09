module.exports = (sequelize, Sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product", // Model name
    {
      // Model attributes
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true, // or false, depending on your requirement
      },
      description: {
        type: Sequelize.TEXT,
      },
      ingredients: {
        type: Sequelize.TEXT,
        defaultValue: [],
        // get() {
        //   return JSON.parse(this.getDataValue("ingredients"));
        // },
        // set(val) {
        //   this.setDataValue("ingredients", JSON.stringify(val));
        // },
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inventory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      final_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      discount_percentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // review_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
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

  return Product;
};
