const express = require("express");
const router = express.Router();
const { getHint} = require("../services/getHintServices.js"); // Import the service function

// GET route for loading a hint
router.get("/api/getHint", async (req, res) => {
	try {
		// Call the service function to handle the logic
		const result = await getHint();

		if (result.success) {
			return res.status(200).json({
				data: result.data,
				message: result.message,
			});
		} else {
			return res.status(404).json({ error: result.message });
		}
	} catch (error) {
		console.error("Error in hint loading:", error);
		return res.status(500).json({ error: "Error loading hint" });
	}
});

module.exports = router;

