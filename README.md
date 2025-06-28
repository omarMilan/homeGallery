HomeGallery - Local Family Photo & Video Gallery
================================================

This is a full-stack web app to upload, view, and delete photos/videos on a local network. 
Perfect for sharing memories with family using an old Linux laptop as the server.

Project Structure:
------------------
/backend         → Node.js server (Express, Multer)
  └── assets/
      └── content/   ← Uploaded media saved here

/dist            → React frontend (after `npm run build`)
.env             → Frontend config (backend IP)

Setup Steps:
============

1. On Your Main Dev Computer:
-----------------------------
1. Clone this repo or copy project files.
3. Before you build, update the backend IP address in your React code:
   - src/pages/AddPage.jsx
   - src/pages/ViewPage.jsx
   - src/pages/DeletePage.jsx
   Replace `http://localhost:3001` with your Linux laptop's IP (e.g., `http://192.168.0.15:3001`)

4. Build the React frontend:
   npm run build

4. Transfer both folders to your Linux laptop:
   /backend
   /dist
   (Use USB, scp, or file sharing)

2. On the Linux Laptop (Local Server):
--------------------------------------
- Install Node.js:
  sudo apt update
  sudo apt install nodejs npm

- Install backend dependencies:
  cd backend
  npm install express multer cors

- Start the backend server:
  node server.js
  → Backend runs at: http://192.168.0.15:3001

3. Serve the Frontend:
----------------------
- Install a static server:
  npm install -g serve

- Serve the React build:
  serve -s dist -l 5173
  → Frontend runs at: http://192.168.0.15:5173

4. Access From Any Device:
--------------------------
Visit http://192.168.0.15:5173 from any device on the same Wi-Fi.

Features:
- View the gallery
- Upload new photos/videos
- Delete old ones

Secure & Private:
-----------------
- Local-only access (inside Wi-Fi)
- No cloud/internet required

Optional Improvements:
----------------------
- Use pm2 or systemd to auto-run backend on startup
- Set static IP for Linux laptop in your router
- Add slideshow, drag-and-drop upload, etc.

License:
--------
MIT – Use freely and enjoy with your family ❤️
