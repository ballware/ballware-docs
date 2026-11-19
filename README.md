# ballware docs

Documentation portal for the ballware low-code platform — published at
[docs.ballware.de](https://docs.ballware.de).

Built with [Docusaurus 3](https://docusaurus.io/). The site has four content
instances: `docs/` (platform), `administration/`, `guide/` (end users), and
`api/` (OpenAPI-generated reference).

## Local development

```bash
npm ci
npm start
```

## Build and checks

```bash
npm run typecheck
npm run build
npm run serve
```

`npm run build` fails on broken internal links (`onBrokenLinks: 'throw'`).

## Deployment

The `pages.yml` workflow builds and deploys to GitHub Pages on `main`.
`static/CNAME` maps the custom domain `docs.ballware.de` (GitHub Pages custom
domain and DNS must be configured separately).
