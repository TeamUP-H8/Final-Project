"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.hasMany(models.UserGame);
      Game.hasMany(models.Post);
    }
  }
  Game.init(
    {
      platform: DataTypes.STRING,
      name: DataTypes.STRING,
      maxPlayers: DataTypes.INTEGER,
      rankList: DataTypes.STRING,
      roleList: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
