const sequelize = require("../database.js");
const { Game, Hint, Image, ImageHint  } = require("../models");

async function getHint() {
  try {
    // Fetch a game with exactly 16 images
    const game = await Game.findOne({
      order: sequelize.literal("rand()"), // Randomize the order
      include: [
        { model: Hint }, // Include related hints
        { model: Image, required: true }, // Only include games with images
      ],
    });
    if (!game) {
      return { success: false, message: "No game with exactly 16 images found" };
    }

    return { success: true, data: game, message: "Hint loaded successfully" };
  } catch (error) {
    console.error("Error in hint loading:", error);
    return { success: false, message: "Error loading hint" };
  }
}

module.exports = {getHint };