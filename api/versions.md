---
title: API versions
sidebar_position: 5
---

# API versions

Version basis: the **`main` branch** of each documented repository (state of
2026-11-19). Every service repo runs the same release pipeline: GitVersion
(`ContinuousDeployment` mode, patch increments on `main`) drives package
versions, and the CI pipeline creates a `v<SemVer>` git tag for main
releases and publishes `ghcr.io/ballware/<image>:<SemVer>` plus a floating
`:stable` tag.[^1]

| Component | Latest `main` tag | GHCR image | Runtime |
| --- | --- | --- | --- |
| `ballware-meta-service` | `v1.4.0` | `ghcr.io/ballware/ballware-meta-service` (SemVer + `stable`) | .NET 10 |
| `ballware-generic-service` | `v1.5.0` | `ghcr.io/ballware/ballware-generic-service` (SemVer + `stable`) | .NET 10 |
| `ballware-storage-service` | `v9.3.1` | `ghcr.io/ballware/ballware-storage-service` (SemVer + `stable`) | .NET 8 |
| `ballware-ml-service` | `v1.2.1` | `ghcr.io/ballware/ballware-ml-service` (SemVer + `stable`) | .NET 8 |
| `ballware-document-service` | `v1.3.1` | `ghcr.io/ballware/ballware-document-service` **and** `…-document-app` (two images, SemVer + `stable`) | .NET 10 |
| `ballware-angular` (web client) | `v9.6.0` | `ghcr.io/ballware/ballware-angular` (`:latest` from main + tag-pushed releases) | Angular 19 / nginx |
| `ballware-keycloak` | `v1.2.0` | `ghcr.io/ballware/ballware-keycloak` (SemVer + `stable`) | Keycloak **26.8.2** base |
| `ballware-apigateway` | `v2.0.12` | `ghcr.io/ballware/ballware-apigateway-service` (SemVer + `stable` from `main`, `latest` from `develop`; multi-arch) | .NET 10, YARP 2.3.0 |

Notes:

- The web client's in-repo version markers (`@ballware/webclient` and all
  `@ballware/*` libs at **9.6.0**) match the newest release tag; the root
  workspace `package.json` carries an inconsistent lower version (8.6.1) that
  is not used for images.[^2]
- The Docker Compose evaluation stack does **not** use these images — it
  builds every service straight from the repository `main` branch via git
  build contexts (and it runs **no** gateway at all), so the compose stack
  tracks main HEAD (it can be ahead of the newest tag).[^3]
- Supporting infrastructure pins in the compose stack: `postgres:17`,
  `mcr.microsoft.com/mssql/server:2022-latest`, `minio/minio:latest`,
  `minio/mc:latest`, `axllent/mailpit`, `alpine:3.20` (preseed helper).[^3]

:::caution Status: out of scope
Production deployment pins (Coolify/k3s image pin lists) come from
out-of-scope repositories and are deliberately not listed here.
:::

## OpenAPI snapshot versions

The generated reference in this portal is built from OpenAPI snapshots
committed under `openapi/`; `openapi/snapshot.json` records the fetch date,
source URLs, OpenAPI versions (`meta` 3.0.4, others 3.0.1), and per-service
path counts. Re-fetch with `npm run api:fetch` against a running stack and
review the diff before committing.[^4]

[^1]: `GitVersion.yml` + `.github/workflows/publish-packages.yml` in `ballware-meta-service`, `ballware-generic-service`, `ballware-storage-service`, `ballware-ml-service`, `ballware-document-service`, `ballware-apigateway`; `ballware-keycloak/.github/workflows/docker-image.yml`; `ballware-angular/.github/workflows/docker-release.yml` + `docker-latest.yml`; tag lists on each repository remote
[^2]: `ballware-angular/package.json`, `ballware-angular/apps/webclient/package.json`, `ballware-angular/libs/*/package.json`
[^3]: `ballware-docker-compose/docker-compose.yml` (`build: context: "…/ballware-<repo>.git#main:…"` for keycloak, meta, generic, ml, reporting/document, storage, app; infrastructure image pins)
[^4]: `openapi/snapshot.json`, `scripts/fetch-openapi.mjs` in this repository
