const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const restaurantRoutes = require("./routes/get_restaurant");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/", restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
