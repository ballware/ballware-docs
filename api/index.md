---
title: API overview
---

# API overview

The ballware platform exposes HTTP APIs fronted by `ballware-apigateway`
(public entry point `api.ballware.de`). Each service publishes OpenAPI
documents (user API and internal `service`/`schema` APIs).

This instance will contain:

- a **generated API reference** built from OpenAPI snapshots committed under `openapi/` in this repository
- **authentication** — OAuth2/OIDC flows, audiences, token exchange
- **route map** — gateway routes to the internal services
- **MCP endpoints** — `/meta/mcp` and `/generic/mcp` tool surfaces

The generated reference is not published yet; until it is, only the pages
listed in this repository exist here.
