---
title: Evaluation with Docker Compose
sidebar_position: 2
---

# Evaluation with Docker Compose

Source: `ballware-docker-compose` (`main`). The stack builds every component
from its repository `main` branch, so it reflects current stable code.[^1]

## Prerequisites

- Docker ≥ 20.10, Docker Compose ≥ 2.0, ≥ 8 GB RAM[^2]
- GitHub credentials for the private package/build feeds (`GITHUB_USERNAME`,
  `GITHUB_PAT` are consumed as Docker build args by meta, generic, ml,
  storage, and reporting)[^1][^3]
- A DevExpress license key and NuGet feed (`BALLWARE_DEVEXTREMEKEY`,
  `DEVEXPRESS_NUGETFEED`) for the reporting build[^2][^3]

## Setup

1. Clone the repo and create a `.env` file (gitignored; the variable names
   are listed in the [configuration reference](/administration/configuration-reference)
   — never commit values).[^2]
2. `docker compose up -d`. First `preseed-keycloak` runs: it renders
   `realms/ballware-realm.tpl` via `envsubst` into the realm-import volume and
   issues a self-signed TLS cert (`tls.crt`/`tls.key`) consumed by Keycloak
   HTTPS; Keycloak then starts with `--import-realm` and waits on
   `preseed-keycloak` completing successfully.[^1][^4]
3. Trust `tls.crt` (extracted from the preseed container's certs volume) in
   the OS trust store — the README documents the commands for macOS, Linux,
   and Windows.[^2][^4]
4. Open `http://localhost:3000` (web client).[^2]

## Port and access table (as published by the compose file)

| Port | Service / URL | Notes |
| --- | --- | --- |
| 3000 | web client | `http://localhost:3000` |
| 3001 | Keycloak HTTP | **not documented in the README**, but published |
| 3002 | Keycloak HTTPS admin/UI | `https://localhost:3002` |
| 5001 | meta | Swagger UI at `/swagger`[^1][^2] |
| 5002 | generic | Swagger UI at `/swagger` |
| 5003 | ml | Swagger UI at `/swagger` |
| 5004 | document/reporting | Swagger UI at `/swagger`; designer/viewer routes |
| 5005 | storage | Swagger UI at `/swagger` |
| 5432 | PostgreSQL | |
| 1433 | SQL Server | **not documented in the README**, but published and used by generic |
| 9000 / 9001 | MinIO API / console | |
| 1025 / 8025 | Mailpit SMTP / UI | only 8025 is documented in the README |

[^1][^2]

## Troubleshooting (from the README)

Port conflicts, GitHub auth failures during image builds, DB connection
errors, certificate errors, build/network errors, log inspection, and restart
patterns are covered in the README's troubleshooting section (EN + mirrored
DE version).[^2]

:::caution Status: known rough edges on main
- The README's prerequisites port list omits **3001** (Keycloak HTTP),
  **1433** (SQL Server), and **1025** (Mailpit SMTP) although the compose file
  publishes them.[^1][^2]
- The reporting service sets `Mail__SmtpPort: 8025` and the realm's SMTP
  server port to 8025, while Mailpit listens for SMTP on 1025 (8025 is its
  HTTP UI) — whether this fails at runtime: **not verified**.[^1]
- The keycloak service env uses the deprecated `KC_PROXY` although the built
  image is Keycloak 26.8.2 (`KC_PROXY_HEADERS` is the supported name).[^1]
- The realm template assigns the realm role `Global Administrator` to the
  admin user, but that role is not defined in the template's role list.[^5]
- The generic service block mixes `MlClient__*` and `MLClient__TokenEndpoint`
  casing — potential config-binding mismatch, **not verified**.[^1]
:::

[^1]: `ballware-docker-compose/docker-compose.yml`
[^2]: `ballware-docker-compose/README.md` (prerequisites, setup, TLS trust, ports/Swagger table, troubleshooting); `README_DE.md` mirrors it section-by-section
[^3]: `ballware-docker-compose/docker-compose.yml` (`build.args` per service)
[^4]: `ballware-docker-compose/scripts/preseed-keycloak.sh`
[^5]: `ballware-docker-compose/realms/ballware-realm.tpl`
