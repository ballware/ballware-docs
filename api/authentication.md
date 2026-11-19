---
title: Authentication
sidebar_position: 2
---

# Authentication

All ballware HTTP APIs are protected by OAuth2/OIDC tokens issued by the
platform Keycloak (realm `ballware` at `identity.ballware.de` in production).
Two flows matter for API consumers: interactive user login and
service-to-service client credentials.[^1][^2]

## User tokens (authorization code + PKCE)

The Angular web client uses the public client `ballwareweb` with
`openid profile offline_access` plus API scopes (`identityApi metaApi
genericApi storageApi documentApi mlApi`). Tokens carry the `tenant` claim and
multivalued `right` claims; see [Identity and access](/docs/identity-and-access)
for the full claim model.[^2][^3]

## Service tokens (client credentials)

Confidential clients named after the services (`meta`, `generic`, `storage`,
and locally `ml`, `reporting`) obtain tokens via the OAuth2 client-credentials
grant. In production the ml and document services reuse the `meta` client
credentials instead of dedicated clients.[^4]

Secrets are provided only via environment variables — names:
`META_CLIENT_SECRET`, `GENERIC_CLIENT_SECRET`, `STORAGE_CLIENT_SECRET`.[^4]

## Which scope unlocks which API

A request is authorized when the token's `scope` claim contains the policy
scope required by the endpoint. Most endpoints are dual-scoped (user scope or
`serviceApi`).[^1][^5]

| API surface | User scope | Service scope |
| --- | --- | --- |
| `/meta/**` | `metaApi` | `serviceApi` |
| `/generic/**` | `genericApi`, `metaApi` | `serviceApi`, `schemaApi` |
| `/storage/**` | `storageApi` | `serviceApi` |
| `/ml/**`, `/ai/**` | `mlApi` | `serviceApi` |
| `/document/**` | `documentApi` | `serviceApi` |
| `/meta/mcp`, `/generic/mcp` | see [MCP endpoints](/api/mcp) | — |

Beyond scopes, entity-level rights (`<application>.<entity>.<action>`, from
the `right` claim) gate data access.[^1]

:::caution Status: not consistent across environments
`genericApi` and `schemaApi` scopes are provisioned in local/dev realm
configuration; the current production realm export does not define them.
Audience validation also varies (`metaApi` vs `ballwareweb`).[^6][^4]
:::

## OpenAPI documents

Each service publishes Swagger JSON at
`/swagger/{document}/swagger.json` (no auth required locally). The committed
snapshots in this repository were fetched from those endpoints; see
[API versions](/api/versions).[^7]

[^1]: `ballware-meta-service/src/Ballware.Meta.Service/Startup.cs`, `ballware-generic-service/src/Ballware.Generic.Service/Startup.cs`, `ballware-storage-service/src/Ballware.Storage.Service/Startup.cs`, `ballware-document-service/src/Ballware.Document.Hosting/ServiceCollectionExtensions.cs`
[^2]: `ballware-angular-coolify/docker-compose.yml`, `ballware-angular/apps/webclient/src/ssr.server.ts`
[^3]: `ballware-keycloak/import/ballware-realm.json`
[^4]: `ballware-backend-coolify/README.md`
[^5]: `ballware-generic-service/src/Ballware.Generic.Api/Endpoints/GenericDataEndpoint.cs`, `.../TenantSchemaEndpoint.cs`
[^6]: `/Users/frank/Documents/GitHub/ballware-local/realms/ballware-realm.tpl`, `ballware-keycloak/import/ballware-realm.json`
[^7]: `openapi/snapshot.json` in this repository
