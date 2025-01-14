const { DataTypes } = require('sequelize');
const sequelize = require('./database.js'); // Importing sequelize instance

const GameModel = sequelize.define('Game', {
  game_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'game',
  timestamps: false,
});

const HintModel = sequelize.define('Hint', {
  hint_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: GameModel,
      key: 'game_id',
    },
    onDelete: 'CASCADE',
  },
  hint_text: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  number_of_images: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'hint',
  timestamps: false,
});

// Define the Image model
const ImageModel = sequelize.define('Image', {
  image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: GameModel,
      key: 'game_id',
    },
    onDelete: 'CASCADE',
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'image',
  timestamps: false,
});

// Define the ImageHint model (for many-to-many relation between Hint and Image)
const ImageHintModel = sequelize.define('ImageHint', {
  hint_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: HintModel,
      key: 'hint_id',
    },
    onDelete: 'CASCADE',
  },
  image_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ImageModel,
      key: 'image_id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'image_hint',
  timestamps: false,
});

// Set up relationships between models
GameModel.hasMany(HintModel, { foreignKey: 'game_id' });
HintModel.belongsTo(GameModel, { foreignKey: 'game_id' });

ImageModel.belongsTo(GameModel, { foreignKey: 'game_id' });
GameModel.hasMany(ImageModel, { foreignKey: 'game_id' });

ImageHintModel.belongsTo(ImageModel, { foreignKey: 'image_id' });
ImageHintModel.belongsTo(HintModel, { foreignKey: 'hint_id' });
ImageModel.belongsToMany(HintModel, { through: ImageHintModel, foreignKey: 'image_id' });
HintModel.belongsToMany(ImageModel, { through: ImageHintModel, foreignKey: 'hint_id' });

// Export all models using CommonJS
module.exports = {
  Game: GameModel,
  Hint: HintModel,
  Image: ImageModel,
  ImageHint: ImageHintModel,
};