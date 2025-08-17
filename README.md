# Apollo Image Explorer (Challenge Brief v3.5)

This project was built as part of **Challenge Brief (v3.5) — Web Team** for Leonardo.Ai.  
It follows the requirements outlined in the challenge and demonstrates a production-quality implementation using **Next.js**, **Chakra UI**, and **Apollo Client**.

---

## Challenge Requirements Addressed

1. **Documentation**: Codebase is structured and commented for clarity.
2. **Next.js App Router + TypeScript**: Implemented using Next.js 15 with App Router and TypeScript.
3. **Git Setup**: Managed via Git.
4. **Chakra UI**: UI styled exclusively with Chakra UI v3.
5. **Responsive UI**: Designed to be responsive across desktop and mobile (tested down to iPhone 5 width).
6. **Footer**: Displays the challenge version.
7. **Blocking Flow**:
   - User must enter **username** and **job title** before accessing data.
   - Profile data persists in `localStorage`.
   - Users can **view** and **edit** this information.
8. **Apollo Client + GraphQL**:
   - Uses [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql).
   - Displays characters with images and metadata.
   - Data fetch is blocked until profile is set.
9. **Information Page**:
   - Paginated list of characters.
   - Direct URL linking supported (e.g., `/information?page=3`).
10. **Detail Modal**:
    - Item click opens a modal with character details and episode list.
11. **Deployment**:
    - Configured for **Vercel free tier**.
12. **Minimal Dependencies**:
    - Built only with core tools required for the challenge.

---

## File Structure

src
├─ app
│ ├─ blocker/  
│ │ └─ page.tsx
│ ├─ information/  
│ │ └─ page.tsx
│ ├─ layout.tsx  
│ └─ page.tsx  
├─ contexts
│ └─ user-profile.tsx  
├─ graphql
│ ├─ apollo-client.ts  
│ └─ ricky-morty.gql.ts  
├─ hooks
│ └─ use-require-profile.ts  
├─ shared
│ ├─ components
│ │ ├─ layout/BlockerLayout.tsx
│ │ └─ ui/
│ │ ├─ BlockerModal.tsx
│ │ ├─ CharacterModal.tsx
│ │ ├─ Footer.tsx
│ │ ├─ Header.tsx
│ │ └─ provider.tsx
│ ├─ constants/colors.ts
│ └─ utils/formatValue.ts

## Scripts

```bash
pnpm install     # Install dependencies
pnpm run dev     # Start dev server on localhost:3000
pnpm run lint    # Run ESLint
```
