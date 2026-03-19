const express = require("express");
console.log("THIS IS THE CORRECT SERVER FILE");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* MULTER SETUP */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

/* DATA */
let events = [];

/* ROUTES */

/* ADD EVENT */
app.post("/api/events", upload.single("image"), (req, res) => {

  const { title, description, date } = req.body;

  if (!title || !description || !date) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    description,
    date,
    image: req.file ? "/uploads/" + req.file.filename : null
  };

  events.push(newEvent);

  res.json({ message: "Event added", event: newEvent });
});

/* GET EVENTS */
app.get("/api/events", (req, res) => {
  res.json(events);
});

/* SERVER */
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});