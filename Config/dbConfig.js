const mysql = require('mysql2/promise'); // Use promise-based MySQL library

// Configure the database connection settings
const dbConfig = {
  host: 'localhost',        // MySQL host
  user: 'root',             // MySQL username
  password: 'admin',        // MySQL password
  database: 'task',         // MySQL database name
  port: 3306,               // MySQL port, usually 3306
};

// Create a connection pool only once and export it
let poolPromise;

const getPool = async () => {
  if (!poolPromise) {
    poolPromise = mysql.createPool(dbConfig); // Create the pool without .then()
    console.log('Connected to MySQL database successfully');
  }
  return poolPromise;
};

module.exports = {
  getPool,   // Export the connection pool getter function
};
