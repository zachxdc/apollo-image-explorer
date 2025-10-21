# Apollo Image Explorer

**Next.js 15 + Server Components + Apollo GraphQL**

Rick & Morty character explorer showcasing modern Next.js 15 architecture with server-side rendering, optimized images, and minimal client-side JavaScript.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

🚀 **[Live Demo](https://apollo-image-explorer.vercel.app/information)**

---

## ✨ Features

- 🖥️ **Server Components** - Default server-side rendering with minimal client JS
- 🎨 **Chakra UI 3** - Modern component library with dark mode support
- 🚀 **Server-Side Data Fetching** - GraphQL queries executed on the server
- 🖼️ **Optimized Images** - Next.js Image with automatic WebP/AVIF conversion
- 📱 **Responsive Design** - Perfect on mobile, tablet, and desktop
- 🔍 **SEO Optimized** - Metadata API with OpenGraph tags
- 🪟 **Character Details** - Modal with episodes and information
- 📄 **Pagination** - URL-based pagination with shareable links
- 💾 **Persistent State** - User profile saved in localStorage

---

## 🏗️ Architecture Highlights

### Server-First Approach
```
✅ Server Components (default)
  └── Client Components (only where needed)
      └── Interactive logic (modals, pagination)
```

### Data Fetching Strategy
- **Server:** Character list data fetched with native `fetch()` + Next.js caching
- **Client:** Character detail queries via Apollo Client
- **Caching:** Leveraged Next.js 15 Data Cache for optimal performance

### Component Structure
- **Server Components:** Layout, Footer, Information Page
- **Client Components:** User interactions (cards, pagination, modals)
- **Minimal JS:** ~30-40% less client-side bundle compared to pure CSR

---

## 📊 Performance

```
Route (app)                    Size    First Load JS
┌ ○ /                        1.06 kB        101 kB
├ ○ /blocker                 3.67 kB        140 kB
└ ƒ /information            22.6 kB        178 kB

○ (Static)  - Pre-rendered at build time
ƒ (Dynamic) - Server-rendered on demand
```

**Key Metrics:**
- ✅ Information page server-rendered
- ✅ Static pages pre-rendered
- ✅ Optimized bundle size (99.8 kB shared JS)
- ✅ Automatic image optimization

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Development server (with Turbopack)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── blocker/              # User profile blocking page
│   ├── information/          # Character list (Server Component)
│   │   ├── page.tsx         # Server-rendered character grid
│   │   └── loading.tsx      # Loading UI
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Home redirect
├── graphql/
│   ├── server-fetch.ts      # Server-side GraphQL utility
│   ├── apollo-client.ts     # Client-side Apollo setup
│   └── ricky-morty.gql.ts   # GraphQL queries
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── CharacterCard.tsx         # Client component
│   │   │   ├── PaginationControls.tsx    # Client component
│   │   │   ├── CharacterModal.tsx        # Client component
│   │   │   └── ...
│   │   └── layout/
│   │       └── BlockerLayout.tsx
│   ├── constants/
│   └── utils/
└── contexts/
    └── user-profile.tsx     # User state management
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15.4.6 (App Router) |
| UI Library | Chakra UI 3.24.2 |
| GraphQL Client | Apollo Client 3.13.9 |
| Language | TypeScript 5.x |
| Package Manager | pnpm |
| Deployment | Vercel |

---

## 🎯 Next.js 15 Features Used

✅ **Server Components** - Default server-side rendering  
✅ **Server Actions** - Server-side data fetching  
✅ **Metadata API** - SEO optimization  
✅ **Loading UI** - Convention-based loading states  
✅ **Image Optimization** - Automatic image processing  
✅ **Turbopack** - Fast development builds  
✅ **Type-safe** - Full TypeScript support  

---

## 📝 API

Uses the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql)

**Example Query:**
```graphql
query Characters($page: Int!) {
  characters(page: $page) {
    info { pages }
    results {
      id
      name
      status
      species
      image
    }
  }
}
```

---

## 🔧 Configuration

### Environment Variables
No environment variables required - uses public Rick and Morty API.

### Next.js Config
```javascript
// next.config.mjs
export default {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "rickandmortyapi.com",
    }],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "@apollo/client"],
  },
};
```

---

## 📖 Documentation

- [OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md) - Detailed optimization breakdown
- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://www.chakra-ui.com/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)

---

## 📄 License

MIT

---

**Built with ❤️ using Next.js 15 Server Components**
