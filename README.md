<p align="center">
  <img src="docs/logo.png" width="128" height="128" alt="Roger Twan logo">
</p>

<h3 align="center">Roger Twan</h3>

<p align="center">
  Personal website for an AI-assisted product engineer, built with Next.js and Tailwind CSS.
  Visit <a href="https://roger.ink" target="_blank">roger.ink</a>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/dynamic/json?label=Version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Froger-twan%2Froger.ink%2Fmain%2Fpackage.json&color=cyan" alt="Version">
  <img src="https://img.shields.io/badge/dynamic/json?label=Node&query=engines.node&url=https%3A%2F%2Fraw.githubusercontent.com%2Froger-twan%2Froger.ink%2Fmain%2Fpackage.json&color=purple" alt="Node version">
  <img src="https://img.shields.io/badge/dynamic/json?label=NPM&query=engines.npm&url=https%3A%2F%2Fraw.githubusercontent.com%2Froger-twan%2Froger.ink%2Fmain%2Fpackage.json&color=purple" alt="NPM version">
  <img src="https://img.shields.io/badge/dynamic/json?label=Next&query=dependencies.next&url=https%3A%2F%2Fraw.githubusercontent.com%2Froger-twan%2Froger.ink%2Fmain%2Fpackage.json" alt="Next.js version">
  <img src="https://img.shields.io/badge/dynamic/json?label=Tailwind&query=devDependencies.tailwindcss&url=https%3A%2F%2Fraw.githubusercontent.com%2Froger-twan%2Froger.ink%2Fmain%2Fpackage.json" alt="Tailwind CSS version">
</p>

---

## Overview

This repository powers my personal website and portfolio, focused on AI-assisted product engineering: how I use AI across research, prototyping, design, development, review, documentation, testing, and iteration.

The site presents my work as a full-stack product engineer moving closer to AI-native product engineering. It combines polished product surfaces, project evidence, journal writing, and a RAG-powered chat experience through Roger's AI.

## Site Structure

- `/` - Homepage focused on AI-assisted product workflow and selected work
- `/projects` - Project archive with category filtering
- `/journal` - Build notes, technical writing, and product reflections
- `/chat` - Roger's AI, a RAG-powered conversational interface
- `/about` - Background, working model, experience, and education
- `/contact` - Contact channels and collaboration intent

## Architecture

- Next.js App Router for routing and server-rendered pages
- Tailwind CSS for the responsive interface and visual system
- Structured project and journal data modules
- Obsidian-backed content sources for projects, journal entries, and portfolio context
- RAG-powered chat interface connected to an external AI backend
- Unit and e2e checks for key UI behavior

## Content Sources

Projects, journal entries, and portfolio context are maintained in my Obsidian workspace and transformed into structured site data. Roger's AI uses this content as part of its retrieval context, so the chat experience can answer questions about my work, projects, and writing.

## Development

Create a `.env` file in the project root and add the required environment variables, including `GITHUB_TOKEN` when fetching GitHub-backed content.

```bash
npm install
npm run dev
```

Open <http://localhost:3000> in the browser.

## Scripts

- `npm run dev` - Start the local development server
- `npm run lint` - Run lint checks
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run Playwright tests
- `npx tsc --noEmit` - Run TypeScript checks

Common verification flow:

```bash
npm run lint
npx tsc --noEmit
npm run test:unit
npm run test:e2e
```

## GitHub Actions

GitHub Actions runs code checks whenever changes are pushed to the main branch.

## Build Logs

See [docs/BUILD_LOGS.md](docs/BUILD_LOGS.md) for the full history.

### 5.0.0 (2026-07-05)

- [Revamp] Reposition the site around AI-assisted product engineering
- [Improvement] Redesign homepage, projects, journal, about, contact, and chat experiences
- [Improvement] Rename portfolio and blog surfaces to projects and journal
- [Improvement] Refresh README structure and move full build logs into docs
