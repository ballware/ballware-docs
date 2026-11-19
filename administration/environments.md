---
title: Environments
sidebar_position: 1
---

# Environments

## The documented environment: Docker Compose evaluation stack

`ballware-docker-compose` composes the full platform on one machine. Its
distinguishing property: **every service is built straight from the `main`
branch** of its repository via git build contexts — the stack therefore tracks
current stable code, ahead of tagged releases if necessary.[^1]

| Component | Source | Ports |
| --- | --- | --- |
| Web client | build `ballware-angular.git#main` (`apps/webclient/Dockerfile`) | 3000 |
| Keycloak | build `ballware-keycloak.git#main` (Keycloak 26.8.2 base) | 3001 HTTP / 3002 HTTPS |
| meta service | build `ballware-meta-service.git#main` | 5001 |
| generic service | build `ballware-generic-service.git#main` | 5002 |
| ml service | build `ballware-ml-service.git#main` | 5003 |
| document/reporting service | build `ballware-document-service.git#main` | 5004 |
| storage service | build `ballware-storage-service.git#main` | 5005 |
| PostgreSQL 17 | `postgres:17` | 5432 (databases `keycloak`, `quartz`, `storage`, `meta`, `tenant`, `ml`, `reporting`) |
| SQL Server 2022 | `mcr.microsoft.com/mssql/server:2022-latest` | 1433 (database `tenant`) |
| MinIO | `minio/minio:latest` (+ one-shot `minio-init`) | 9000 API / 9001 console |
| Mailpit | `axllent/mailpit` | 1025 SMTP / 8025 UI |
| preseed-keycloak | `alpine:3.20` one-shot | renders the realm template, issues the TLS cert |

**Entry model:** there is no reverse proxy in this stack — services publish
their ports directly, and the web client is wired to them via `BALLWARE_*URL`
variables. The platform's single-origin entry component, `ballware-apigateway`,
is documented in these portal (routing, auth, health endpoint — see [Route
map](/api/route-map)), but it is **not part of the compose stack**: it runs as
its own container (`ghcr.io/ballware/ballware-apigateway-service`, listening on
port `5010`) and is not composed by `ballware-docker-compose`.[^1][^2]

## Evaluation vs. production

| Aspect | Evaluation (compose) | Production |
| --- | --- | --- |
| Documented here | yes | **out of scope** (hosting repos excluded) |
| Hosting | single machine | not documented |
| Public entry | direct service ports (no gateway in the stack) | gateway component documented (`ballware-apigateway`); its hosting is not |
| Identity | Keycloak 26.8.2 (compose, realm from rendered template) | Keycloak 26.8.2 per `ballware-keycloak` (production realm export contains only `ballwareweb` + built-ins) |
| Databases | PostgreSQL 17 + SQL Server 2022 | not documented |
| Object storage | MinIO | not documented |
| Backups | none shipped with the compose repo | not documented |

:::caution Status: production details withheld
A production deployment demonstrably exists (the production realm export,
public base URLs like `app.ballware.de` and `reporting.ballware.de`), but the
repositories describing its hosting, pinning, and backup automation are out of
scope for this portal — so no claims about it are made.
:::

[^1]: `ballware-docker-compose/docker-compose.yml` (services, build git contexts `#main`, ports, one-shot helpers)
[^2]: `ballware-apigateway/src/Ballware.ApiGateway.Service/Dockerfile` (port `5010`), `.github/workflows/publish-packages.yml` (image publishing), `appsettings.json` (committed default destinations)
