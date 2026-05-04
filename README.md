# Three.js Shirt Customizer

React app that loads a baked shirt GLB in the browser, lets you orbit the model, and applies a logo as a **decal** on the fabric. Logos load from a default Cloudinary image on first paint; uploading a new image in the UI uploads to Cloudinary and swaps the decal texture.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (comes with Node)

## Getting started

```bash
cd Frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Other scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server with HMR |
| `npm run build`| Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint               |

## Features

- **3D shirt** from `public/shirt_baked.glb`, rendered with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) and [Drei](https://docs.pmnd.rs/drei) (`Clone`, `Decal`, `useGLTF`, `useTexture`).
- **Default logo** via Cloudinary URL in `src/App.jsx` (`DEFAULT_LOGO_URL`).
- **Upload** in the customizer panel: posts to Cloudinary; on success, `secure_url` becomes the new logo URL for the decal.

## Project layout

```
Frontend/
  public/
    shirt_baked.glb   # Shirt model
  src/
    App.jsx           # Logo URL state + layout
    canvas/
      CanvasModel.jsx # R3F Canvas, lights, controls, Suspense
      Shirt.jsx       # Model, material color, decal logic
    components/
      Canvas.jsx      # Passes props into CanvasModel
      Customizer.jsx  # File input + Cloudinary upload
  utils/
    textToTexture.js  # Optional canvas → texture helper (if you extend text features)
```

## Cloudinary

Uploads use the unsigned preset and cloud name configured in `src/components/Customizer.jsx`. For your own deployment:

1. Create a Cloudinary account and an **unsigned** upload preset.
2. Replace the preset name, cloud name, and upload endpoint in `Customizer.jsx` if they differ from the sample.

The default decal image URL is defined next to app state in `App.jsx`.

## Tech stack

- React 19, Vite 8
- Three.js, `@react-three/fiber`, `@react-three/drei`
- Tailwind CSS 4
