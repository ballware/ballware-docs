---
title: Route map
sidebar_position: 3
---

# Route map

Each service maps its own routes and — in the documented evaluation stack —
publishes them on its own port. There is **no in-repo API gateway**: the web
client reaches the services via the `BALLWARE_*URL` env wiring, and production
proxy behavior (public `api.ballware.de`) is out of scope for these docs.[^1]

## Per-service routes

| Service | Compose port | Route prefixes | Swagger docs |
| --- | --- | --- | --- |
| meta | 5001 | `/meta/**` — `entity`, `entityright`, `lookup`, `page`, `pickvalue`, `processingstate`, `statistic`, `export`, `job`, `documentation`, `tenant`; MCP `/meta/mcp` | `meta`, `service` |
| generic | 5002 | `/generic/**` (dynamic entity CRUD/query); `/tenant/**` — `lookup`, `processingstate`, `statistic`, `tenant`, `mlmodel` (committed route is `tenent/mlmodel`); schema provisioning `/api/tenant/createorupdateschemafortenant/{tenantId}`, `…/createorupdateentityschemafortenant/{tenantId}`, `…/dropschemafortenant/{tenantId}`, `…/dropentityschemafortenant/{tenantId}/{identifier}`; MCP `/generic/mcp` | `generic`, `service`, `schema` |
| ml | 5003 | `/ml/mlmodel/**`, `/ml/tenant` | `ml`, `service` |
| document | 5004 | `/document/**` — `document`, `notification`, `subscription`, `processingstate`; DevExpress reporting MVC routes; separate Blazor app image hosts designer/viewer plus a sign-on endpoint (`…/signon/{idToken}` wiring via web client env names), public base URL `reporting.ballware.de` in its committed config | `document`, `service` |
| storage | 5005 | `/storage/attachment/**`, `/storage/temporary/**` | `storage`, `service` |
| Keycloak | 3001 (HTTP), 3002 (HTTPS) | standard OIDC endpoints under `/realms/ballware/…`; custom realm resources `/realms/ballware/ballware-user-api/**`, `/realms/ballware/ballware-role-api/**` | — |
| web client | 3000 | app shell (SSR + static nginx) | — |

[^1][^2]

## Cross-cutting behavior

- **Dual scoping:** the same user route accepts a user token (`metaApi`,
  `genericApi`, …) **or** a service token (`serviceApi`); service routes take
  an explicit `{tenantId}`. Schema provisioning routes require `schemaApi`.[^2]
- **Swagger access:** Swagger UI/JSON per service is gated by
  `Swagger:EnableClient` and the documents listed above.[^2]
- **MCP routes** (`/meta/mcp`, `/generic/mcp`) are mounted by the services
  themselves — see [MCP endpoints](/api/mcp).[^2]
- **Schema provisioning** is called by the meta service's tenant/entity
  repository hooks via its schema client.[^2][^3]

:::caution Status: out-of-scope routing removed
Earlier revisions of this page documented gateway-specific behavior (deny-by-
default proxy, anonymous download routes, claim→header transforms, k8s cluster
DNS). That evidence came from `ballware-apigateway` and deployment repos,
which are out of scope; those statements are no longer made here.
:::

[^1]: `ballware-docker-compose/docker-compose.yml` (published ports, `BALLWARE_*URL` wiring), `ballware-docker-compose/README.md` (port/URL table)
[^2]: `ballware-meta-service/src/Ballware.Meta.Service/Startup.cs`, `ballware-generic-service/src/Ballware.Generic.Service/Startup.cs` (+ `src/Ballware.Generic.Api/Endpoints/TenantSchemaEndpoint.cs`), `ballware-ml-service/src/Ballware.Ml.Service/Startup.cs`, `ballware-document-service/src/Ballware.Document.Service/Startup.cs` + `src/Ballware.Document.App/Startup.cs` + `src/Ballware.Document.App/appsettings.json`, `ballware-storage-service/src/Ballware.Storage.Service/Startup.cs`, `ballware-keycloak/user-role-api/`
[^3]: `ballware-meta-service/src/Ballware.Meta.Service/Extensions/GenericSchemaTenantRepositoryHook.cs`, `.../GenericSchemaEntityRepositoryHook.cs`
