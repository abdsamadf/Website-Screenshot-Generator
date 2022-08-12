# Website Screenshot Generator - Screenzia

![Logo](public/logo.png)

In this project, web application will allow its users to get an programmatically automated screenshot of any website in seconds.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Project Problem

We need to get an automated screenshot of a website. Just paste the URL of the website in the input field and click the `Submit` button. The screenshot will be generated. The screenshot will be saved in the supabase storage. Each user folder will be named by the user's unique ID when they registered on the website. The screenshot will be saved in the user's Ids folder.

## Project Motivation

Learning latest technologies like Next.js, TypeScript, and React, TalwindCSS, RestAPIs is a great motivation for us to create this project. We want to make this project as easy as possible for users to use.

## Project Goals

* Create a web application that allows users to get an automated screenshot of a website in seconds.
* Try to follow best practices for web applications.
* Building custom users interfaces by using TalwindCSS Framework.
* Using TypeScript because its a superset of typed JavaScript that can be used to write clean, readable, and efficient code with additional features like strong static typing and compilation.

## Folder Structure

/pages/api/ - API routes - This folder contains all code we need to access APIs for our application.
/pages/ - React pages - This folder contains all React components that will be used in our application. Next.js will treat every component in this folder as a page.
/public/ - Static assets - This folder contains all static assets that will be used in our application.
/src/utils/ - Utility functions - This folder contains all utility functions that will be used in our application.
/styles

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
