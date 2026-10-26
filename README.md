# Plantopia

Point your phone at a plant and learn everything about it. Plantopia is a mobile-first web app that identifies plants from a photo using OpenAI's vision model and returns a full plant profile in seconds.

## What you get from one photo

- **Names:** scientific name and common names
- **Safety:** whether it's edible, with a detailed toxicity profile for poisonous plants (toxic compounds, affected parts, symptoms)
- **Background:** description, history, interesting uses, spiritual uses and symbolism
- **Growing guide:** soil type and pH, watering, sunlight and temperature, and propagation methods
- **In the kitchen:** a recipe, but only when the plant is edible

## How it works

1. **Capture.** The app opens the phone's back camera in the browser (`getUserMedia`) and captures a frame to a canvas.
2. **Analyse.** The image is sent to a Next.js API route (`/api/identify`), which calls **GPT-4o mini** with the image and a detailed prompt.
3. **Structure.** The request uses OpenAI's JSON mode (`response_format: json_object`) and a fixed schema, so every response comes back as clean, predictable JSON that the UI renders section by section. Toxic plants get extra toxicology detail and never a recipe.

The OpenAI key is only used server-side in API routes; it is never sent to the browser.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| AI | OpenAI Node SDK, GPT-4o mini (vision + JSON mode) |
| Styling | Tailwind CSS v4, React Icons, Montserrat |
| Camera | Browser MediaDevices API with a canvas capture |

## Getting started

```bash
git clone https://github.com/wdpza/plantopia.git
cd plantopia
npm install
```

Create `.env.local` in the project root:

```bash
OPENAI_API_KEY=your-openai-api-key
```

Start the dev server and open http://localhost:3000:

```bash
npm run dev
```

The camera needs a secure context. `localhost` works on your computer; to test on a phone, serve the app over HTTPS (for example with a tunnel or a Vercel preview deploy).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint with ESLint |

## Project structure

```
src/
├── app/
│   ├── page.tsx                # Home screen
│   ├── identify/page.tsx       # Camera capture and results
│   └── api/
│       ├── identify/route.ts   # Image → GPT-4o mini → structured plant profile
│       └── chat/route.ts       # Chat endpoint (groundwork for follow-up questions)
├── components/
│   ├── CameraCapture.tsx       # Back-camera capture
│   └── layout/                 # Top bar and bottom navigation
└── lib/openai.ts               # Shared OpenAI client
```

## Roadmap

- Follow-up chat about the identified plant
- Growing guide section and a plant marketplace (placeholders on the home screen)
- Saving identified plants to a personal collection

## A note on safety

AI identification can be wrong. Never eat or handle a plant based on the app alone; confirm with a reliable field guide or an expert.

## Author

Built by [Wikus du Plessis](https://github.com/wdpza).
