const { Sequelize } = require('sequelize');

// Replace these with your actual database credentials
const sequelize = new Sequelize('ClueCapture', 'root', 'test123', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306' // This indicates you're using MySQL
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;