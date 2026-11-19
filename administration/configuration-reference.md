---
title: Configuration reference
sidebar_position: 3
---

# Configuration reference

**Names only — values of secrets are never documented** (portal rule).
Sources: the compose stack on `main`, the gateway's `appsettings.json` and
`Configuration/` options, the services' `Configuration/` option classes, the
web client's env contract, and CI pipeline secret references.

## Host `.env` (compose)

Required[^1]: `GITHUB_USERNAME`, `GITHUB_PAT`, `BALLWARE_DEVEXTREMEKEY`,
`DEVEXPRESS_NUGETFEED`

Optional[^1][^2]: `BALLWARE_GOOGLEKEY`, `DB_ADMIN_PASSWORD`,
`DB_KEYCLOAK_PASSWORD`, `DB_QUARTZ_PASSWORD`, `DB_STORAGE_PASSWORD`,
`DB_META_PASSWORD`, `DB_TENANT_PASSWORD`, `DB_ML_PASSWORD`,
`DB_REPORTING_PASSWORD`, `KEYCLOAK_ADMIN_USER`, `KEYCLOAK_ADMIN_PASSWORD`,
`MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`, `STORAGE_CLIENT_SECRET`,
`META_CLIENT_SECRET`, `ML_CLIENT_SECRET`, `GENERIC_CLIENT_SECRET`,
`REPORTING_CLIENT_SECRET`, `KEYCLOAK_REALM_BASE` (external Keycloak URL)

Advanced compose-only[^2]: `MINIO_INIT_BUCKETS`, `MINIO_INIT_VERSIONING`,
internal base-URL overrides `STORAGE_BASE`, `META_BASE`, `GENERIC_BASE`,
`ML_BASE`, and the preseed cert knobs `CERT_CN`, `CERT_DAYS`, `CERT_SAN_DNS`,
`CERT_SAN_IP`, `MAKE_PKCS12`, `KEYSTORE_PASSWORD`, `PKCS12_NAME`,
`PKCS12_FILE`.

## Keycloak runtime

Compose env names: `KC_DB`, `KC_DB_URL_HOST`, `KC_DB_URL_PORT`,
`KC_DB_USERNAME`, `KC_DB_PASSWORD`, `KC_HEALTH_ENABLED`, `KC_METRICS_ENABLED`,
`KC_PROXY` (deprecated — see the caution on the evaluation page),
`KC_HOSTNAME_ADMIN_URL`, `KC_HTTPS_CERTIFICATE_FILE`,
`KC_HTTPS_CERTIFICATE_KEY_FILE`, `QUARKUS_HTTP_LIMITS_MAX_HEADER_SIZE`,
`QUARKUS_HTTP_LIMITS_MAX_INITIAL_LINE_LENGTH`, `QUARKUS_HTTP_HTTP2`.[^2]
Dev-container only: `KC_BOOTSTRAP_ADMIN_USERNAME`, `KC_BOOTSTRAP_ADMIN_PASSWORD`,
`KC_TRANSACTION_XA_ENABLED`, `KC_HOSTNAME`, `DEBUG_PORT`.[^3] Production
guidance uses `KC_PROXY_HEADERS=x-forwarded` and a PostgreSQL `KC_DB_URL`.[^4]

## Services (ASP.NET config sections, per env name pattern `<Section>__<Key>`)

| Section | Seen in | Keys (names) |
| --- | --- | --- |
| `Kestrel` | all services | `Endpoints__Http__Url` (compose binds each service port) |
| `Authorization` | all services | `Authority`, `Issuer` (document only), `Audience`, `ClientId` (document only), `RequiredScopes`, `RequireHttpsMetadata`, plus option-class defaults `TenantClaim`, `UserIdClaim`, `RightClaim`, `RequiredMetaScope`/`RequiredServiceScope`/`RequiredSchemaScope`/`RequiredUserScopes`/`RequiredServiceScopes` |
| `Cors` | all services | `AllowedOrigins`, `AllowedMethods`, `AllowedHeaders` |
| `Swagger` | all services | `EnableClient`, `ClientId`, `ClientSecret`, `RequiredScopes` |
| `Quartz` | all services | scheduler/jobStore/dataSource settings |
| `StorageClient` / `MetaClient` / `GenericClient` / `MlClient` / `SchemaClient` | meta, generic, ml, document | `ServiceUrl`, `TokenEndpoint`, `ClientId`, `ClientSecret`, `Scopes` |
| `Storage` | meta, generic, ml, document, storage | `Provider`, `AutoMigrations`, `ConnectionString`; meta also `AutoSeedAdminTenant` |
| `MinioStorage` | storage | `Endpoint`, `AccessKey`, `SecretKey`, `UseSSL`, `BucketName` |
| `TenantStorage`, `PostgresTenantStorage`, `SqlServerTenantStorage` | generic | `Provider`, `ConnectionString`, `Enabled` |
| `ConnectionStrings` | per service | `MetaConnection`, `MetaStorageConnection`, `StorageConnection`, `QuartzConnection`, `TenantStorageConnection`, `TenantStorageMasterConnection`, `TenantStorageSqlServerConnection` |
| `Mcp` | meta, generic | `Enabled` (generic), `RequiredMcpScope`, `ResourceUri` |
| `Cache` | meta, generic, ml | `RedisConfiguration` |
| `Serilog` | meta | `MinimumLevel__Override__…` |
| `Trigger`, `Mail` | document | `Trigger__Active__N__Name/Frequency/Cron`; `Mail__FromName`, `Mail__FromMail`, `Mail__SmtpHost`, `Mail__SmtpPort`, `Mail__SmtpUser`, `Mail__SmtpPassword`, `Mail__SmtpUseSsl` |
| `DataProtection` | document | `KeysPath` |

[^2][^5]

:::caution Status: sensitive derived credentials
The generic service generates a database user (`tenant_<guid>`) and password
per tenant and persists the full connection string in its `tenant_connection`
master table. Protect the meta/generic master databases accordingly.[^6]
:::

## Web client (`ballware-angular`)

Runtime contract `window.ENV` → `ENV` token, variable names:
`BALLWARE_VERSION`, `BALLWARE_DEVEXTREMEKEY`, `BALLWARE_GOOGLEKEY`,
`BALLWARE_IDENTITYURL`, `BALLWARE_METAURL`, `BALLWARE_TENANTURL`,
`BALLWARE_GENERICURL`, `BALLWARE_MLURL`, `BALLWARE_STORAGEURL`,
`BALLWARE_DOCUMENTURL`, `BALLWARE_DOCUMENT_DESIGNER_URL`,
`BALLWARE_DOCUMENT_VIEWER_URL`, `BALLWARE_DOCUMENT_SIGNON_URL`,
`BALLWARE_CLIENTID`, `BALLWARE_CLIENTSECRET`, `BALLWARE_IDENTITYSCOPES`,
`BALLWARE_TENANTCLAIM`, `BALLWARE_USERNAMECLAIM`, `BALLWARE_ACCOUNTURL`,
`BALLWARE_IDENTITYAUTOREFRESH`, `BALLWARE_BASEURL` (SSR only). SSR server
adds `AUTH_SECRET`.[^7]

## API gateway (`ballware-apigateway`)

| Section | Keys (names) | Notes |
| --- | --- | --- |
| `Authorization` | `Authority`, `Audience` (both **required** — startup fails without them), `Issuer`, `TenantClaim` (default `tenant`), `UserIdClaim` (default `sub`), `RightClaim` (default `right`), `RequireHttpsMetadata`, `RequiredMetaScope` (`metaApi`), `RequiredServiceScope` (`serviceApi`) | deliberately **not committed**; supplied via `appsettings.local.json` (git-ignored) or environment variables[^9] |
| `Cors` | `AllowedOrigins` | any header/method, credentials enabled, only for listed origins[^9] |
| `ReverseProxy` | `Routes` (per route: `ClusterId`, `AuthorizationPolicy`, `Match`, `Transforms`, `Metadata.AuthorizationTokenHeader`), `Clusters.Destinations.Address` | committed routing defaults; see [Route map](/api/route-map)[^9] |
| `OAuthProtectedResourceRoutes` | per route: `Match`, `OAuthProtectedResource` (`ResourceName`, `ScopesSupported`, `BearerMethodsSupported`, optional `Resource`, `AuthorizationServers`, documentation/policy/ToS URIs, `JwksUri`, `AdditionalMetadata`) | RFC 9728 discovery metadata, see [MCP endpoints](/api/mcp)[^9] |
| `Kestrel` | `Limits.MaxRequestLineSize`, `Limits.MaxRequestBodySize`, `Endpoints.Http.Url` (dev) | dev launch profiles: `http://localhost:5010`, `https://localhost:6010`[^9] |
| `Serilog` / `Logging` | level overrides (`Yarp` at Debug) | console sink[^9] |

Configuration layering order: `appsettings.json` →
`appsettings.{ASPNETCORE_ENVIRONMENT}.json` → `appsettings.local.json` →
environment variables. Container deployments supply everything through
environment variables; the `Dockerfile` exposes port `5010` and runs as
non-root `app`.[^9]

## CI secret names (never values)

`GITHUB_TOKEN`, `GITHUB_USERNAME`, `GITHUB_PAT`, `SONAR_TOKEN`,
`DEVEXPRESS_LICENSE`, `DEVEXPRESS_NUGETFEED`, `TEST_META_PASSWORD`,
`TEST_TENANT_PASSWORD`, `TEST_STORAGE_PASSWORD`, `TEST_ML_PASSWORD`,
`TEST_DOCUMENT_PASSWORD`.[^8]

[^1]: `ballware-docker-compose/README.md` (required/optional env tables)
[^2]: `ballware-docker-compose/docker-compose.yml` (interpolated `${…}` names and per-service env keys)
[^3]: `ballware-keycloak/.devcontainer/docker-compose.yml`
[^4]: `ballware-keycloak/README.md`, `ballware-keycloak/Dockerfile`
[^5]: `Configuration/AuthorizationOptions.cs` and `Configuration/SwaggerOptions.cs` in each service repo; `ballware-document-service/src/Ballware.Document.Hosting/BallwareDocumentOptions.cs`
[^6]: `ballware-generic-service/src/Ballware.Generic.Tenant.Data.Postgres/Internal/PostgresSchemaProvider.cs` (generated tenant credentials persisted in the connection record)
[^7]: `ballware-angular/apps/webclient/src/app/env.ts`, `apps/webclient/src/index.html`, `apps/webclient/docker-entrypoint.sh`, `apps/webclient/src/ssr.server.ts`
[^8]: `.github/workflows/sonarqube-latest.yml` and `.github/workflows/publish-packages.yml` in the service repos; `ballware-document-service/src/Ballware.Document.Service/Dockerfile` (build args)
[^9]: `ballware-apigateway/src/Ballware.ApiGateway.Service/appsettings.json`, `appsettings.Development.json`, `Configuration/AuthorizationOptions.cs`, `Configuration/OAuthProtectedResourceOptions.cs`, `Properties/launchSettings.json`, `Dockerfile`, `README.md` (configuration layering section)
