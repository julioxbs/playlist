require("dotenv").config();
const express = require('express');
const connectToDB = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;
connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!, keep moving forward");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
})