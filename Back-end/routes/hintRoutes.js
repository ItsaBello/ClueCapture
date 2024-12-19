const express = require('express');
const router = express.Router();
const { submitHint } = require('../services/hintServices.js'); // Import the service function

// POST route for submitting a hint
router.post('/api/hints', async (req, res) => {
  const { images, hintImages, hintText, gameCategory } = req.body;

  // Validate the input
  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'No images provided' });
  }

  if (!hintText || typeof hintText !== 'string' || hintText.trim() === '') {
    return res.status(400).json({ error: 'Invalid or empty hint text' });
  }

  try {
    // Call the service function to handle the logic
    const result = await submitHint(images, hintImages, hintText, gameCategory);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error in hint submission:', error);
    return res.status(500).json({ error: 'Error submitting hint' });
  }
});

module.exports = router;