# nextjs-hybrid-minimal

Demo of nextjs project with both SSG and SSR templates.

This demo shows an example of static site generator (SSG) option for generally static pages \(**/**, **/about-us**, **/contact** and **/posts**\), 
together with other pages under and including **/categories**, which are are server side rendered (SSR).


Example project structure from `magnolia\_dev_\content-to-import\website.nextjs-hybrid-minimal.yaml`:
| Item                    | Template                         | Type |
|-------------------------|----------------------------------|------|
| /                       | Next.js Hybrid SSG: Basic        | SSG  |
| /about-us               | Next.js Hybrid SSG: Basic        | SSG  |
| /contact                | Next.js Hybrid SSG: Contact      | SSG  |
| /posts                  | Next.js Hybrid SSG: Basic        | SSG  |
| /categories             | Next.js Hybrid SSR: Categories   | SSR  |
| /categories/switzerland | Next.js Hybrid SSR: Categories   | SSR  |
| /categories/germany     | Next.js Hybrid SSR: Categories   | SSR  |

Modification of pages with SSG type template will be available after re-build with `npm run build` command.

## Build Setup

```bash
# install dependencies
$ npm install

# build and launch dev server with hot reload
$ npm run build
$ npm run dev

# build and launch server
$ npm run build
$ npm start
```