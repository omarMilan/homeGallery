HomeGallery - Local Family Photo & Video Gallery
================================================

This is a full-stack web app to upload, view, and delete photos/videos on a local network. 
Perfect for sharing memories with family using an old Linux laptop as the server.

Setup Steps:
============

1. On Your Main Dev Computer:
-----------------------------
- Clone this repo:
  git clone https://github.com/omarMilan/HomeGallery.git
  cd HomeGallery

- Before you build, update the backend IP address in your React code:
  Edit these files and replace the IP with your Linux laptop's IP (e.g., http://192.168.0.15:3001):
    - src/pages/AddPage.jsx
    - src/pages/ViewPage.jsx
    - src/pages/DeletePage.jsx

- Build and serve the React frontend locally for development:
  npx vite --host

2. On the Linux Laptop (Local Server):
--------------------------------------
- Install Node.js and npm:
  sudo apt update
  sudo apt install nodejs npm

- Clone the repo on the Linux laptop:
  git clone https://github.com/omarMilan/HomeGallery.git

- Install dependencies (do in the backend folder aswell):
  npm i
  npm install express multer cors

3. Running Two Terminals on Linux Laptop:
-----------------------------------------
Since you need to run both backend and frontend servers simultaneously, open two terminal windows or tabs.

- **Option 1: Use two terminal windows:**  
  Simply open two terminal applications side by side.

- **Option 2: Use terminal multiplexers:**  
  - Install `tmux` or `screen` to manage multiple terminal sessions inside one window.
  - Example for tmux:
    sudo apt install tmux
    tmux
    # Use Ctrl+b + " to split horizontally or Ctrl+b + % to split vertically.
    # Navigate splits with Ctrl+b + arrow keys.

- Run backend server in one terminal:
  node server.js

- Run frontend server or static serve in the other:
  npx vite --host

4. Access From Any Device:
--------------------------
Visit http://<linux_laptop_ip>:5173 from any device on the same Wi-Fi network.

Features:
---------
- View the gallery
- Upload new photos/videos
- Delete old ones

Secure & Private:
----------------
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
