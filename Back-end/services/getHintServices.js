const sequelize = require("../database.js");
const { Game, Hint, Image, ImageHint } = require("../models");

async function getHint() {
	try {
		// Use await to resolve the promise
		const game = await Game.findAll({
			order: sequelize.literal("rand()"), // Randomize the order
			limit: 1, // Limit to one game
			include: [
				{ model: Hint }, // Include related hints
				{ model: Image }, // Include related images
			],
		});
		console.log("Hint loaded successfully:", game);
		return game;
	} catch (error) {
		console.error("Error in hint loading:", error);
		return { success: false, message: "Error loading hint" };
	}
}

module.exports = { getHint };
