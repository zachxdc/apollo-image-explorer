# Apollo Image Explorer (Challenge Brief v3.5)
Apollo Image Explorer is a web application built with Next.js, Chakra UI, and Apollo Client.
It allows users to explore characters from the Rick and Morty universe with images, metadata, and episode details in a clean, responsive interface.

## TL;DR
Rick & Morty character explorer built with Next.js + Chakra UI + Apollo Client.  
- 🚪 User must enter profile info (persisted in localStorage).  
- 📄 Paginated character list with images and data.  
- 🪟 Character modal shows details + episodes.  
- 📱 Responsive: iPhone 4/5 usable, iPhone 6+ perfect.  
- 🚀 [Live demo](https://apollo-image-explorer.vercel.app/information)

## Features
1. **Documentation**: Clean, structured codebase, set up with git.
2. **Next.js App Router + TypeScript**: Built using Next.js 15 with TypeScript.
3.	**State Persistence**: User profile (username + job title) saved in localStorage and persists across reloads.
4. **Chakra UI**: UI styled exclusively with Chakra UI v3.
5. **Responsive Design**: Optimised for mobile, tablet, and desktop.
	•	iPhone 5s and earlier: Supported, but layout and styling may not be perfect due to very small screen constraints.
	•	iPhone 6 and above: Perfect support with full responsiveness.
6. **Footer**: Displays the challenge version.
7. **Blocking Flow**:
   - Users must enter username and job title before accessing data.
   - Profile data persists in `localStorage`.
   - Profile information can be viewed and edited at any time.
8. **Apollo Client + GraphQL**:
   - Uses [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql).
   - Displays characters' images and data.
   - Data fetch is blocked until the profile is set.
9. **Information Page**:
   - Characters displayed as a card design in a paginated list.
   - Supports direct URL linking (e.g., /information?page=3).
10. **Detail Modal**:
    - Clicking on a character opens a modal with detailed info and episode appearances.
11. **Deployment**:
    - Deployed on Vercel free tier 
    - Live demo: [https://apollo-image-explorer.vercel.app/information](https://apollo-image-explorer.vercel.app/information)
12. **Minimal Dependencies**:
    - Built only with the core tools required for the challenge.

## File Structure:
```
src
├─ app
│  ├─ blocker/
│  │  └─ page.tsx
│  ├─ information/
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ layout.tsx
│  └─ page.tsx
├─ contexts/
│  └─ user-profile.tsx
├─ graphql/
│  ├─ apollo-client.ts
│  └─ ricky-morty.gql.ts
├─ hooks/
│  └─ use-require-profile.ts
├─ shared/
│  ├─ components/
│  │  ├─ layout/
│  │  │  └─ BlockerLayout.tsx
│  │  └─ ui/
│  │     ├─ BlockerModal.tsx
│  │     ├─ CharacterModal.tsx
│  │     ├─ Footer.tsx
│  │     ├─ Header.tsx
│  │     └─ provider.tsx
│  ├─ constants/
│  │  └─ colors.ts
│  └─ utils/
│     └─ formatValue.ts
```

## Scripts
```bash
pnpm install     # Install dependencies
pnpm run dev     # Start dev server on localhost:3000
pnpm run lint    # Run ESLint
```
