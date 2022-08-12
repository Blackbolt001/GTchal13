const { Model, DataTypes, INTEGER } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type:INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
    },
    product_id: {
      type:INTEGER,
      references: {
        Model:'Product',
        key:'id'
      }
  },
  tag_id: {
    type:INTEGER,
    reference: {
      Model:'Tag',
      key:'id'
  }
},
  
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
