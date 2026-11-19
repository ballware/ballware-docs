---
title: Authentication
sidebar_position: 2
---

# Authentication

All ballware HTTP APIs are protected by OAuth2/OIDC tokens issued by Keycloak
(realm **`ballware`**). In the documented evaluation stack the authority is
`http://keycloak:8080/realms/ballware` for service-side validation and
`https://localhost:3002/realms/ballware` for browser sign-on.[^1] Where the
platform fronts clients with `ballware-apigateway`, the gateway performs the
same bearer validation before proxying — see [Gateway enforcement](#gateway-enforcement-ballware-apigateway).
Two flows matter for API consumers: interactive user login and
service-to-service client credentials.[^1][^2]

## User tokens (authorization code + PKCE)

The public client `ballwareweb` (redirect `/signin-oidc`) is used by the
Angular web client. Scopes: `openid profile` plus the API scopes offered by
the realm — `identityApi metaApi storageApi documentApi mlApi messagingApi`
in the production export, plus `genericApi` and `schemaApi` in the evaluation
realm template. Tokens carry the `tenant` claim and multivalued `right`
claims; see [Identity and access](/docs/identity-and-access) for the full
claim model.[^3][^4]

## Service tokens (client credentials)

Confidential clients named after the services (`storage`, `meta`, `generic`,
`ml`, `reporting`) are defined in the **evaluation realm template** with
service accounts; tokens are obtained via the OAuth2 client-credentials
grant.[^4] Secret env names: `STORAGE_CLIENT_SECRET`, `META_CLIENT_SECRET`,
`GENERIC_CLIENT_SECRET`, `ML_CLIENT_SECRET`, `REPORTING_CLIENT_SECRET`;
internal base-URL override names: `STORAGE_BASE`, `META_BASE`, `GENERIC_BASE`,
`ML_BASE`.[^4] Services consume these through their
`StorageClient__*` / `MetaClient__*` / `GenericClient__*` / `MlClient__*` /
`SchemaClient__*` configuration sections.[^2]

:::caution Status: not consistent across environments
The committed production realm export defines **no** confidential service
clients at all — client provisioning for production happens outside the
documented repositories. `genericApi` and `schemaApi` scopes exist only in
the evaluation realm template.[^3][^4]
:::

## Which scope unlocks which API

A request is authorized when the token's `scope` claim contains the policy
scope required by the endpoint. Most endpoints are dual-scoped (user scope or
`serviceApi`); service-scoped routes take an explicit `{tenantId}` in the
path.[^2][^5]

| API surface | User scope | Service scope |
| --- | --- | --- |
| `/meta/**` | `metaApi` | `serviceApi` |
| `/generic/**`, `/tenant/**` | `genericApi`, `metaApi` | `serviceApi` |
| `/api/tenant/**` (schema provisioning) | — | `schemaApi` |
| `/storage/**` | `storageApi` | `serviceApi` |
| `/ml/**` | `mlApi` | `serviceApi` |
| `/document/**` | `documentApi` | `serviceApi` |
| `/meta/mcp`, `/generic/mcp` | see [MCP endpoints](/api/mcp) | — |

Beyond scopes, entity-level rights (`<application>.<entity>.<action>`, from
the `right` claim) gate data access.[^2]

In the evaluation stack every service validates the audience **`metaApi`**
(`Authorization__Audience`), matching the realm audience mappers.[^1][^4]

## Gateway enforcement (`ballware-apigateway`)

When clients reach the platform through the gateway, it validates the bearer
token itself before forwarding:[^7]

- JWT Bearer against the required `Authorization:Authority` and
  `Authorization:Audience` configuration; the gateway **fails at startup**
  (validation-on-start options → `ConfigurationException`) when these are
  missing. `MapInboundClaims` is off; issuer validation uses
  `Authorization:Issuer` when set, otherwise the authority.[^7]
- Claim names are configurable — defaults `TenantClaim: tenant`,
  `UserIdClaim: sub`, `RightClaim: right`, aligned with the platform claim
  model; `RequiredMetaScope` (`metaApi`) and `RequiredServiceScope`
  (`serviceApi`) exist as options for stricter deployments.[^7]
- **Deny-by-default:** a fallback policy requires an authenticated user for
  every route; only routes declaring `"AuthorizationPolicy": "Anonymous"`
  (the download routes and the reporting app host route) are open.[^7]
- For WebSockets and Server-Sent Events (`Accept: text/event-stream`) the
  access token may be passed as an `access_token` **query parameter** —
  accepted only for those request kinds.[^7]
- `AuthorizationTokenHeaderMiddleware` lets clients that cannot send
  `Authorization` (for example MCP clients using a provider-specific header)
  present the token in a route-specific header, which is copied to
  `Authorization: Bearer …` before authentication; enabled per route via route
  metadata `AuthorizationTokenHeader`.[^7]
- The gateway also serves RFC 9728 `/.well-known/oauth-protected-resource/**`
  metadata so MCP clients can resolve the authorization server and scopes
  (`metaApi` for `/meta/mcp`, `genericApi` for `/generic/mcp`) — see
  [MCP endpoints](/api/mcp).[^7]

:::caution Status: gateway authority values not committed
`Authorization:Authority`/`Audience` are deliberately **not** part of the
committed configuration (the README example uses `ballware` as audience).
Which authority/audience a deployment configures is therefore not verifiable
from the repository; in the compose stack the gateway is not deployed, and
each service validates audience `metaApi` itself.[^1][^4]
:::

## OpenAPI documents

Each service serves Swagger JSON per named document (Swagger UI gated by
`Swagger:EnableClient`): `meta`/`service` (5001), `generic`/`service`/`schema`
(5002), `ml`/`service` (5003), `document`/`service` (5004), `storage`/`service`
(5005). The committed snapshots in this repository were fetched from a running
evaluation stack; see [API versions](/api/versions).[^6]

[^1]: `ballware-docker-compose/docker-compose.yml` (`Authorization__Authority`, `Authorization__Audience`, `Authorization__Issuer` per service; Keycloak hostname vars)
[^2]: `ballware-meta-service/src/Ballware.Meta.Service/Startup.cs`, `ballware-generic-service/src/Ballware.Generic.Service/Startup.cs`, `ballware-storage-service/src/Ballware.Storage.Service/Startup.cs`, `ballware-ml-service/src/Ballware.Ml.Service/Startup.cs`, `ballware-document-service/src/Ballware.Document.Hosting/ServiceCollectionExtensions.cs` (+ `Configuration/AuthorizationOptions.cs` in each)
[^3]: `ballware-keycloak/import/ballware-realm.json`
[^4]: `ballware-docker-compose/realms/ballware-realm.tpl`
[^5]: `ballware-generic-service/src/Ballware.Generic.Api/Endpoints/GenericDataEndpoint.cs`, `.../TenantSchemaEndpoint.cs`
[^6]: `openapi/snapshot.json` in this repository
[^7]: `ballware-apigateway/src/Ballware.ApiGateway.Service/Program.cs` (`:29`–`:35` fail-fast options, `:91`–`:120` JwtBearer + `access_token` query handling, `:127` fallback policy, `:175`–`:177` middleware order), `Configuration/AuthorizationOptions.cs` (`:9`–`:27`), `appsettings.json` (`AuthorizationPolicy: "Anonymous"` routes, `OAuthProtectedResourceRoutes`), `README.md` (auth and transforms sections)
