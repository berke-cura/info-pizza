const express = require("express");
const router = express.Router();
const pool = require("../db");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("latitude")
      .notEmpty()
      .isFloat()
      .withMessage("Please provide a valid latitude in float type."),
    body("longitude")
      .notEmpty()
      .isFloat()
      .withMessage("Please provide a valid longitude in float type."),
  ],
  async (req, res) => {
    const { latitude, longitude } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.errors.map((error) => error.msg),
        message: "Example request",
        body: { latitude: 41.08354, longitude: 29.04907 },
      });
    }

    try {
      const result = await pool.query(
        `
    SELECT id, name, latitude, longitude, distance
    FROM (
      SELECT
        id,
        name,
        latitude,
        longitude,
        (
          6371 * 
          acos(
            cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) +
            sin(radians($1)) * sin(radians(latitude))
          ) * 1000
        ) AS distance
      FROM restaurant
    ) AS distance_calculation
    WHERE distance <= 10000
    ORDER BY distance
    LIMIT 5;
  `,
        [latitude, longitude],
      );

      const closestRestaurants = result.rows;

      if (closestRestaurants.length === 0) {
        return res
          .status(204)
          .json({ message: "There are no restaurants close to you." });
      }

      closestRestaurants.forEach((restaurant) => {
        restaurant.distance = Math.round(restaurant.distance);
      });

      res.json(closestRestaurants);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Database operation failed" });
    }
  },
);

module.exports = router;
