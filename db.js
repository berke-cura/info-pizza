const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'berke',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'berke',
  password: process.env.DB_PASSWORD || 'berke',
  port: process.env.DB_PORT || 5432
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
  console.log('Connected to the database');
});

module.exports = pool;
