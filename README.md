# Owlbear Rodeo — Dead

A small Owlbear Rodeo extension that adds a **Dead** tool for character tokens.

## Features

- Sidebar tool: **Dead**
- Keyboard shortcut: **C** activates the tool
- Clicking a character token toggles a red X
- The X follows the token when it is moved, rotated, or scaled
- The dead state is stored in token metadata and syncs with the scene
- Clicking the token again removes the X

## Requirements

Node.js and npm.

## Run locally

```bash
npm install
npm run dev
```

Vite will show a local URL, normally:

http://localhost:5173

In Owlbear Rodeo:

1. Open your profile.
2. Go to Extensions.
3. Choose Add Extension.
4. Enter:

http://localhost:5173/manifest.json

5. Create/open a room and enable the extension for that room.

## Build for hosting

```bash
npm install
npm run build
```

The finished static site will be in `dist/`.

Upload the contents of `dist/` to a static web host. The important URL is:

https://YOUR-DOMAIN/manifest.json

Then add that manifest URL to Owlbear Rodeo.

## Change the extension ID

Before publishing, replace:

com.example.owlbear-dead

in `src/main.js` with a unique reverse-domain identifier, for example:

com.yourname.owlbear-dead

This prevents metadata ID collisions with other extensions.
