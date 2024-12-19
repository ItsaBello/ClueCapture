const { Sequelize } = require('sequelize');

const port = 3306;

// Replace these with your actual database credentials
const sequelize = new Sequelize('ClueCapture', 'root', 'watissqlkkrrukzeg2003', {
    host: 'localhost',
    dialect: 'mysql',
    port: port // This indicates you're using MySQL (default port 3306)
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established for SQL on the default port:' + port);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;