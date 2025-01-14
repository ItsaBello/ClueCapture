const sequelize = require("../database.js");
const { Game, Hint, Image, ImageHint } = require("../models");

async function submitHint(images, image_hint, hintText, gameCategory) {
	let transaction;

	try {
		// Start a transaction
		transaction = await sequelize.transaction();

		// Create a new game with an auto-incremented game_id
		const game = await Game.create(
			{ category: gameCategory }, // gameCategory is passed as an argument
			{ transaction }
		);

		// Create the hint entry and associate it with the newly created game
		const hint = await Hint.create(
			{
				hint_text: hintText,
				number_of_images: image_hint.length,
				game_id: game.game_id,
				 // Link the hint to the new game
			},
			{ transaction }
		);

		// Insert all images into the Images table first (even those not part of the hint)
		const allImageInstances = await Promise.all(
			images.map((imageUrl) =>
				Image.create({ image_url: imageUrl, game_id: game.game_id }, { transaction })
			)
		);

		// Prepare to associate the hint with specific images (from the image_hint array)
		const hintImageInstances = [];

		// Find the image instances for the URLs in image_hint
		await Promise.all(
			image_hint.map(async (url) => {
				// Find the image instance from the allImageInstances array
				const imageInstance = allImageInstances.find((img) => img.image_url === url);
				if (imageInstance) {
					hintImageInstances.push(imageInstance); // Collect image instances that will be associated with the hint

					// Create the image_hint join table entry
					await ImageHint.create(
						{
							hint_id: hint.hint_id, // Use the hint's id
							image_id: imageInstance.image_id, // Use the image's id
						},
						{ transaction }
					);
				}
			})
		);

		// Associate images related to the hint (many-to-many relationship)
		await hint.addImages(hintImageInstances, { transaction });

		// Commit the transaction
		await transaction.commit();

		return { success: true, message: "Hint and images submitted successfully!" };
	} catch (error) {
		if (transaction) await transaction.rollback(); // Rollback if any error occurs
		console.error("Error submitting hint and images:", error);
		return { success: false, message: "Error submitting hint and images" };
	}
}

module.exports = { submitHint };
