
## Getting Started

```bash
npm install
npm run dev
Open http://localhost:3000
```

## Hosting

https://meta-test-ashy.vercel.app/

## CI/CD 

There is a short CI/CD pipeline setup using Vercel. The pipeline is triggered on every push to the main branch. The pipeline runs the following operations:

```bash
git clone
vercel build
npm run build
```

## Next.js

Used this framework for server side rendering and routing. Uses React components to handle the views. The Backend API routes are also created using Next.js. following the file based routing system using the App Router (https://nextjs.org/docs/app/building-your-application/routing#the-app-router)