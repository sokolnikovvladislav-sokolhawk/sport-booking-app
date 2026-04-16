# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### SportBook — Бронирование спортивных услуг (`artifacts/sport-booking`)
Mobile app built with Expo (React Native). Sports booking platform.

**Features:**
- 4 main categories: Gyms, Sport sections, Sports medicine, Kids sports
- Venue cards with ratings, reviews, photos gallery
- Trainer cards with specialization, rating, description
- Integrated booking calendar with available time slots
- Bookings management (confirm/cancel)
- Favorites system
- AsyncStorage for persistent state (no backend required)

**Key files:**
- `app/(tabs)/index.tsx` — Home screen with category grid
- `app/(tabs)/gyms.tsx`, `sections.tsx`, `medical.tsx`, `kids.tsx` — Category screens
- `app/(tabs)/bookings.tsx` — Bookings management
- `app/venue/[id].tsx` — Venue detail with booking flow
- `components/VenueCard.tsx`, `TrainerCard.tsx`, `BookingCalendar.tsx`, `ReviewCard.tsx`
- `context/AppContext.tsx` — App state (favorites, bookings)
- `data/venues.ts` — Mock data for all venues and trainers
- `constants/colors.ts` — Design tokens (orange primary #FF6B35)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
