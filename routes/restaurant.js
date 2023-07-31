const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Location info missing.' });
  }

  try {
    const result = await pool.query(`
    SELECT id, name, latitude, longitude,
    (
      6371 * 
      acos(
        cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) +
        sin(radians($1)) * sin(radians(latitude))
      ) * 1000
    ) AS distance
    FROM restaurant
    ORDER BY distance
    LIMIT 5;
  `, [latitude, longitude]);

    const closestRestaurants = result.rows;

    if (closestRestaurants.length === 0 || closestRestaurants[0].distance > 10000) {
      return res.json({ message: 'There are no restaurants close to you.' });
    }

    closestRestaurants.forEach((restaurant) => {
      restaurant.distance = Math.round(restaurant.distance);
    });

    res.json(closestRestaurants);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
