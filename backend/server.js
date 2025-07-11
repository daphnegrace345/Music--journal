// Import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (Replace <username>, <password>, and your database name)
mongoose.connect("mongodb+srv://daphnegrace345:daphnegrace345@sample.favtqej.mongodb.net/?retryWrites=true&w=majority&appName=sample")
  
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));

// Create Song Schema and Model
const songSchema = new mongoose.Schema({
  name: String,
  musicDirector: String,
  hero: String,
  heroine: String,
  genre: String,
  yearOfRelease: Number
});

const Song = mongoose.model("Song", songSchema);

// API to Get a Song by Name
app.get("/songs/:name", async (req, res) => {
  try {
    const song = await Song.findOne({ name: req.params.name });
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// API to Add a New Song
app.post("/songs", async (req, res) => {
  try {
    const newSong = new Song(req.body);
    await newSong.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(500).json({ error: "Error saving song" });
  }
});

// API to Get All Songs
app.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching songs" });
  }
});

// API to Update a Song by Name
app.put("/songs/:name", async (req, res) => {
  try {
    const song = await Song.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: "Error updating song" });
  }
});

// API to Delete a Song by Name
app.delete("/songs/:name", async (req, res) => {
  try {
    const song = await Song.findOneAndDelete({ name: req.params.name });
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting song" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server connected`));
