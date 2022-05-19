require("dotenv").config();
const path = require("path");
const express = require('express');
const connectToDB = require('./database/db');
const Music = require("./model/Music");

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

connectToDB();

app.get("/", (req, res) => {
  res.render("index")
});

app.get("/admin", (req, res) => {
  res.render("admin")
});

app.post("/create", async (req, res) => {
  const music = req.body;
  await Music.create(music);
  res.redirect("/");
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
})