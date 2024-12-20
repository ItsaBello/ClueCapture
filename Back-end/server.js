const express = require("express");
const cors = require("cors"); // Import CORS
const hintRoutes = require("./routes/hintRoutes.js"); // Ensure the path is correct
const sequelize = require("./database.js"); // Import and use Sequelize (ORM)
const getHintRoutes = require("./routes/getHintRoutes.js"); // Import the getHintRoutes.js file

const app = express();
const port = process.env.PORT || 3000; // Server port thats being used

// Middleware to parse JSON bodies
app.use(express.json({ limit: "10mb" })); // JSON format and size
app.use(cors());
// Use website routes
app.use(getHintRoutes, hintRoutes);

//initialize a synchronization with sequelize
sequelize
	.sync()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port: ${port}`);
		});
	})
	.catch((err) => {
		console.error("Unable to sync database:", err);
	});
