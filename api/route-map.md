---
title: Route map
sidebar_position: 3
---

# Route map

Each service maps its own routes and — in the documented evaluation stack —
publishes them on its own port. For a single public origin the platform uses
`ballware-apigateway`, a YARP reverse proxy whose routes are declared in
committed JSON configuration; both views are documented here.[^1]

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

## Gateway routing (`ballware-apigateway`)

The gateway fronts the same prefixes on one origin (default port `5010`).
Routes, matches, and clusters are declared in the `ReverseProxy` section of
`appsettings.json`:[^4]

| Route | Match | Cluster → destination | Auth |
| --- | --- | --- | --- |
| `meta-anonymous-download` | `GET /meta/{entity}/download/**` | `meta-cluster` → `https://api.ballware.de` | Anonymous |
| `meta-api` | `/meta/**` | `meta-cluster` | Authenticated |
| `meta-mcp` | `/meta/mcp/**` | `meta-cluster` | Authenticated |
| `tenant-api` | `/tenant/**` | `tenant-cluster` | Authenticated |
| `generic-anonymous-download` | `GET /generic/{application}/{entity}/download/**` | `generic-cluster` | Anonymous |
| `generic-api` | `/generic/**` | `generic-cluster` | Authenticated |
| `generic-mcp` | `/generic/mcp/**` | `generic-cluster` | Authenticated |
| `reporting-anonymous-download` | `GET /document/{entity}/download/**` | `reporting-cluster` | Anonymous |
| `reporting-api` | `/document/**` | `reporting-cluster` | Authenticated |
| `reporting-app` | `/**` on host `reporting.ballware.de` | `reporting-app-cluster` → `https://reporting.ballware.de` | Anonymous |
| `storage-api` | `/storage/**` | `storage-cluster` | Authenticated |
| `storage-anonymous-download` | `GET /storage/attachment/downloadforentityandownerbyid/**` | `storage-cluster` | Anonymous |
| `ml-api` | `/ml/**` | `ml-cluster` | Authenticated |
| `ml-anonymous-download` | `GET /ml/mlmodel/download/**` | `ml-cluster` | Anonymous |
| `ai-signalr` | `GET /ai/hubs/**` with `Connection: Upgrade` + `Upgrade: websocket` | `ai-cluster` | Authenticated |
| `ai-chat` | `/ai/v1/responses/**` | `ai-chat-cluster` → `https://llm.ballware.de` | Authenticated |
| `ai-api` | `/ai/{entity}/**` | `ai-cluster` | Authenticated |

Matching uses path prefixes, hosts (the reporting app route), and headers (the
WebSocket route); YARP ranks by scheme, host, method, and pattern specificity,
so the gateway's own `/document/**` and `/meta/**` prefixes win on other
hosts. Transforms on the chat route: `PathRemovePrefix: /ai`, claim→header
(`ai_key` → `x-litellm-api-key`), bearer re-emission, and JSON body injection
of the `ballware_meta_mcp`/`ballware_generic_mcp` tool definitions.[^4]

## Cross-cutting behavior

- **Dual scoping:** the same user route accepts a user token (`metaApi`,
  `genericApi`, …) **or** a service token (`serviceApi`); service routes take
  an explicit `{tenantId}`. Schema provisioning routes require `schemaApi`.[^2]
- **Swagger access:** Swagger UI/JSON per service is gated by
  `Swagger:EnableClient` and the documents listed above.[^2]
- **MCP routes** (`/meta/mcp`, `/generic/mcp`) are mounted by the services
  themselves; the gateway proxies them (`meta-mcp`, `generic-mcp` routes) and
  answers their RFC 9728 discovery endpoints — see [MCP endpoints](/api/mcp).[^2]
- **Schema provisioning** is called by the meta service's tenant/entity
  repository hooks via its schema client.[^2][^3]

:::caution Status: gateway destination defaults
The destinations in the table are the gateway's **committed default config**
(public ballware.de hosts); deployments override them via
`appsettings.local.json` or environment variables. The `ai`/`ai-chat` clusters
route to components (AI API, LiteLLM proxy) that are outside the documented
scope, so only the gateway-side routing is described. The compose evaluation
stack runs **no** gateway: there the services are reached on their own ports.
:::

[^1]: `ballware-docker-compose/docker-compose.yml` (published ports, `BALLWARE_*URL` wiring), `ballware-docker-compose/README.md` (port/URL table)
[^2]: `ballware-meta-service/src/Ballware.Meta.Service/Startup.cs`, `ballware-generic-service/src/Ballware.Generic.Service/Startup.cs` (+ `src/Ballware.Generic.Api/Endpoints/TenantSchemaEndpoint.cs`), `ballware-ml-service/src/Ballware.Ml.Service/Startup.cs`, `ballware-document-service/src/Ballware.Document.Service/Startup.cs` + `src/Ballware.Document.App/Startup.cs` + `src/Ballware.Document.App/appsettings.json`, `ballware-storage-service/src/Ballware.Storage.Service/Startup.cs`, `ballware-keycloak/user-role-api/`
[^3]: `ballware-meta-service/src/Ballware.Meta.Service/Extensions/GenericSchemaTenantRepositoryHook.cs`, `.../GenericSchemaEntityRepositoryHook.cs`
[^4]: `ballware-apigateway/src/Ballware.ApiGateway.Service/appsettings.json` (`ReverseProxy.Routes`/`Clusters` as committed on `main`), `ballware-apigateway/README.md` (route map and transform sections)
