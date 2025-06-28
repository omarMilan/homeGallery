// backend/server.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;
const uploadPath = path.join(__dirname, "assets/content");

app.use(cors());
app.use("/content", express.static(uploadPath));

// File upload handler
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/upload", upload.array("files"), (req, res) => {
  res.json({ uploaded: req.files.map((f) => `/content/${f.filename}`) });
});

// Get all files
app.get("/gallery", (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.status(500).send("Can't read folder");
    res.json(files.map((name) => ({ url: `/content/${name}`, name })));
  });
});

// Delete a file
app.delete("/delete/:name", (req, res) => {
  const filePath = path.join(uploadPath, req.params.name);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("Delete failed");
    res.send("Deleted");
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
