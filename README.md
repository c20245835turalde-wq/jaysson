# VOLT Studio

A single-page creative studio site built with Astro. The homepage includes:

- Hero and studio introduction
- Services
- Three-step process
- About
- Selected project studies
- Contact call to action

The project artwork and studio copy are starter content intended to be replaced
with real client work and contact details.

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The homepage lives in `src/pages/index.astro` and composes Astro components from
`src/components/`. The page shell is in `src/layouts/layout.astro`, and shared
styles are in `src/styles/global.css`. Public assets, including the provided
logo mark, are in `public/`.
