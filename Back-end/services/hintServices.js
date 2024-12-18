const sequelize = require('../database.js');
const { Game, Hint, Image } = require('../models');

async function submitHint(images, hintText, gameCategory) {
    let transaction;
  
    try {
        // Start a transaction
        transaction = await sequelize.transaction();

        // Create a new game with an auto-incremented game_id
        const game = await Game.create(
            { category: gameCategory },  // gameCategory is passed as an argument
            { transaction }
        );
  
        // Create the hint entry and associate it with the newly created game
        const hint = await Hint.create(
            { 
                hint_text: hintText,
                game_id: game.game_id,  // Link the hint to the new game
            },
            { transaction }
        );
  
        // Insert all images into the Images table first (even those not part of the hint)
        const allImageInstances = await Promise.all(
            images.map((imageUrl) => Image.create({ image_url: imageUrl, game_id: game.game_id }, { transaction }))
        );
  
        // Optionally, associate only the hint-related images with the hint
        // If you have a way to mark which images are related to the hint, do so here:
        // For example, you could receive an array of image IDs or URLs for hint-specific images.
        
        const hintImageInstances = allImageInstances.slice(0, 5); // Assume the first 5 images are part of the hint, for example
  
        // Associate images related to the hint (many-to-many relationship)
        await hint.addImages(hintImageInstances, { transaction });

        // Commit the transaction
        await transaction.commit();
  
        return { success: true, message: 'Hint and images submitted successfully!' };
    } catch (error) {
        if (transaction) await transaction.rollback(); // Rollback if any error occurs
        console.error('Error submitting hint and images:', error);
        return { success: false, message: 'Error submitting hint and images' };
    }
}

module.exports = { submitHint };