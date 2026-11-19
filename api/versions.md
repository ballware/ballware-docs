---
title: API versions
sidebar_position: 5
---

# API versions

Service image versions currently pinned in the production deployments (Coolify
README and Ansible `group_vars`, consistent as of 2026-11-19):[^1][^2]

| Component | Image / version |
| --- | --- |
| `meta` | `ghcr.io/ballware/ballware-meta-service:1.4.0-alpha.35` |
| `generic` | `ghcr.io/ballware/ballware-generic-service:1.5.0-alpha.19` |
| `storage` | `ghcr.io/ballware/ballware-storage-service:9.3.0` |
| `ml` | `ghcr.io/ballware/ballware-ml-service:1.2.0` |
| `reporting` | `ghcr.io/ballware/ballware-document-service:1.2.0-alpha.2` |
| `apigateway` | `ghcr.io/ballware/ballware-apigateway-service:2.0.10` |
| `llm` (Ansible k3s only) | `ballware_llm_service_version: 0.0.1-38` |
| Web client | Coolify: `ballware-angular:latest` (unpinned); Ansible k3s: `v9.4.0` |
| Identity (Keycloak) | `ghcr.io/ballware/ballware-keycloak:1.2.0`, based on Keycloak 26.8.2 |

Supporting infrastructure pins:[^1][^2][^3]

| Component | Version |
| --- | --- |
| PostgreSQL + pgvector (Coolify) | `pgvector/pgvector:0.8.6-pg18-bookworm` |
| SeaweedFS object storage (Coolify) | `chrislusf/seaweedfs:4.47` |
| k3s (Ansible) | `v1.33.6+k3s1` |
| Longhorn, Velero, StackGres (Ansible) | `1.9.2`, `12.0.1`, `1.18.3` |
| Postgres / MSSQL / MinIO / Mailpit (local compose) | `postgres:17`, `mssql/server:2022-latest`, `minio/minio:latest`, `axllent/mailpit` |

## OpenAPI snapshot versions

The generated reference in this portal is built from OpenAPI snapshots
committed under `openapi/`; `openapi/snapshot.json` records the fetch date,
source URLs, OpenAPI versions (`meta` 3.0.4, others 3.0.1), and per-service
path counts. Re-fetch with `npm run api:fetch` against a running stack and
review the diff before committing.[^4]

Local compose development does not pin service versions — services are built
from the source repositories.

[^1]: `ballware-backend-coolify/README.md`
[^2]: `ballware-ansible/playbooks/group_vars/all.yml`
[^3]: `ballware-docker-compose/docker-compose.yml`, `ballware-identity-coolify/docker-compose.yml`, `ballware-keycloak/README.md`
[^4]: `openapi/snapshot.json`, `scripts/fetch-openapi.mjs` in this repository
