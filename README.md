
## Locally

```bash
npm install
create .env file based on .env.example
npm run dev
Open http://localhost:3000
```

## Hosting

https://meta-test-ashy.vercel.app/

## CI/CD 

There is a short CI/CD pipeline setup using Vercel, which deploys the project directly from Github. [See Deployments](https://github.com/ZoiloGranda/meta-test/deployments). The pipeline is triggered on every push to the main branch. It runs the following operations:

```bash
git clone
vercel build
npm run build
```

## Next.js

Used this framework for server side rendering and routing. Uses React components to handle the views. The Backend API routes are also created using Next.js. following the file based routing system using the App Router (https://nextjs.org/docs/app/building-your-application/routing#the-app-router)

## Typescript

Used Typescript for static typing and better code quality, also to try to avoid as many runtime errors as possible.