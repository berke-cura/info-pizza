const { Pool } = require("pg");

const dbConfig = {
  user: process.env.DB_USER || "berke",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "berke",
  password: process.env.DB_PASSWORD || "berke",
  port: process.env.DB_PORT || 5432,
};

const pool = new Pool(dbConfig);

pool.on("error", (err) => {
  console.error("Error connecting to the database:", err.message);
});

(async () => {
  try {
    await pool.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
})();

module.exports = pool;
