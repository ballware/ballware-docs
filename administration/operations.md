---
title: Operations
sidebar_position: 4
---

# Operations

## Startup order (compose)

Infra first, gated by healthchecks: `postgres`, `minio`, `mssql`. One-shot
helpers run before their consumers: `minio-init` (bucket bootstrap after
MinIO is healthy), `mssql-init` (tenant DB + login/user after SQL Server is
healthy), `preseed-keycloak` (renders the realm JSON and TLS cert; Keycloak
starts only after it completes successfully and after PostgreSQL is
healthy).[^1]

Service readiness: meta waits for PostgreSQL; generic for PostgreSQL **and**
SQL Server; storage for PostgreSQL and MinIO; ml and reporting for
PostgreSQL. The web client has no dependencies (it fails gracefully until the
APIs answer).[^1]

## Health checks

| Component | Mechanism |
| --- | --- |
| PostgreSQL / MinIO / SQL Server | compose healthchecks[^1] |
| Keycloak | `KC_HEALTH_ENABLED=true` in the image build → health endpoints; production guidance probes `/health/ready` on the management port **9000**[^2][^3] |
| The five .NET services | **none shipped**: no health-check endpoints exist in any of the five service repos (verified absence). Use port/HTTP liveness probes at the orchestrator level.[^4] |
| API gateway (`ballware-apigateway`) | `GET /_diag/ping` → `{ "status": "ok" }` (anonymous) — documented for health probes and container readiness.[^8] |

## Upgrades

- **Services:** `main` is the stable line. Each repo's CI tags every main
  release `v<SemVer>` and publishes `ghcr.io/ballware/<image>:<SemVer>` plus a
  floating `:stable` tag (GitVersion `ContinuousDeployment`, patch
  increments on main). Either rebuild the compose stack (`docker compose
  build` re-pulls `main`) or switch services to the pinned GHCR images — see
  [API versions](/api/versions).[^5]
- **Keycloak:** follow the migration notes in `ballware-keycloak/README.md`
  for the 26.6 → 26.8.2 line: stop **all** instances (no rolling upgrade),
  let migration run at startup, verify without realm re-import (client scopes
  must contain `kc-admin-api`; check the `right` claim, the custom
  `ballware-user-api`/`ballware-role-api` responses, theme, SMTP, and the
  `login_failure` lockout table), and give the orchestrator a **termination
  grace of ≥ 15 s** (Keycloak shutdown timeout is 10 s since 26.7.0). Behind a
  load balancer use `KC_PROXY_HEADERS=x-forwarded`, not `KC_PROXY`.[^3]
- **Web client:** release images are published from git tags
  (`ghcr.io/ballware/ballware-angular:<tag>`, plus `:latest` from main).[^5]
- **API gateway:** same release model (`v<SemVer>` tag + GHCR
  `:SemVer`/`:stable` on `main`, `:latest` on `develop`, multi-arch images).
  It is not part of the compose stack; upgrades mean swapping the
  `ghcr.io/ballware/ballware-apigateway-service` image. Configuration changes
  are deployment-side (`appsettings.local.json` / env vars), routing changes
  need no recompilation.[^5][^8]

## Logs and routine ops

The compose README documents log inspection (`docker compose logs <service>`),
restart patterns, and troubleshooting for port conflicts, GitHub build
authentication, DB connection errors, and certificate errors.[^6]

Observability shipped today: Keycloak metrics (`KC_METRICS_ENABLED`),
meta's Serilog overrides for noisy auth namespaces. No centralized logging or
monitoring exists in the documented repositories.[^1][^7]

## Backups

:::caution Status: not covered by the documented scope
The compose repo ships **no** backup automation, and the production backup
tooling lives in out-of-scope repositories (see [Environments](/administration/environments)).
Until that scope is opened, treat backup/restore as an open operations item:
at minimum snapshot the named volumes `pgdata`, `mssqldata`, `miniodata` plus
the realm/import state before destructive operations.[^1]
:::

[^1]: `ballware-docker-compose/docker-compose.yml` (healthchecks, `depends_on` conditions, named volumes)
[^2]: `ballware-keycloak/Dockerfile` (`KC_HEALTH_ENABLED`, `KC_METRICS_ENABLED`)
[^3]: `ballware-keycloak/README.md` (prod rollout section, migration table 26.6 → 26.8.2)
[^4]: repo-wide searches for `MapHealthChecks`/`AddHealthChecks` in `ballware-meta-service`, `ballware-generic-service`, `ballware-storage-service`, `ballware-ml-service`, `ballware-document-service` returned no hits
[^5]: `GitVersion.yml` + `.github/workflows/publish-packages.yml` (per service repo), `ballware-keycloak/.github/workflows/docker-image.yml`, `ballware-angular/.github/workflows/docker-release.yml` + `docker-latest.yml`
[^6]: `ballware-docker-compose/README.md` (troubleshooting section)
[^7]: `ballware-meta-service/src/Ballware.Meta.Service/Startup.cs` (Serilog config), `ballware-docker-compose/docker-compose.yml` (Serilog override env keys)
[^8]: `ballware-apigateway/src/Ballware.ApiGateway.Service/Program.cs` (`:178` `/_diag/ping`), `ballware-apigateway/README.md` (diagnostics + container/CI sections), `src/Ballware.ApiGateway.Service/Dockerfile`, `.github/workflows/publish-packages.yml`
