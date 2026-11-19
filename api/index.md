---
title: API overview
---

# API overview

Each ballware service exposes its HTTP API directly on its own port and
publishes OpenAPI documents (user API and internal `service`/`schema` APIs).

Start here:

- [Authentication](/api/authentication) — OAuth2/OIDC flows, scopes, audiences
- [Route map](/api/route-map) — route prefixes and ports per service
- [MCP endpoints](/api/mcp) — `/meta/mcp` and `/generic/mcp` tool surfaces
- [API versions](/api/versions) — pinned service versions and snapshot policy

Below these pages, the sidebar contains the **generated API reference** built
from OpenAPI snapshots committed under `openapi/` in this repository. Each
service exposes a user API (`meta`, `generic`, `ml`, `reporting` = document
service, `storage`) plus internal service/schema APIs used for
service-to-service calls.
