const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;
const uploadPath = path.join(__dirname, "assets/content");

// Enable CORS for all origins (for dev only)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  })
);

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

// Get all files with createdAt and modifiedAt as ISO strings
app.get("/gallery", (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.status(500).send("Can't read folder");

    Promise.all(
      files.map((name) => {
        const filePath = path.join(uploadPath, name);
        return new Promise((resolve, reject) => {
          fs.stat(filePath, (err, stats) => {
            if (err) reject(err);
            else
              resolve({
                url: `/content/${name}`,
                name,
                createdAt: stats.birthtime.toISOString(),
                modifiedAt: stats.mtime.toISOString(),
              });
          });
        });
      })
    )
      .then((filesWithStats) => res.json(filesWithStats))
      .catch(() => res.status(500).send("Error reading file stats"));
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

// Listen on all network interfaces, so accessible from other devices
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);
