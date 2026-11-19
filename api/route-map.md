---
title: Route map
sidebar_position: 3
---

# Route map

`ballware-apigateway` (YARP) is the single public entry point,
`api.ballware.de`. It is deny-by-default: a fallback authorization policy
applies, and only routes listed here are reachable.[^1]

| Gateway route | Public path | Target | Auth |
| --- | --- | --- | --- |
| `meta-api` | `/meta/**` | meta service | token required |
| `meta-mcp` | `/meta/mcp/**` | meta service (MCP) | token, `metaApi` |
| `meta-anonymous-download` | `GET /meta/{entity}/download/**` | meta service | anonymous |
| `generic-api` | `/generic/**` | generic service | token required |
| `generic-mcp` | `/generic/mcp/**` | generic service (MCP) | token, `genericApi` |
| `generic-anonymous-download` | `GET /generic/{application}/{entity}/download/**` | generic service | anonymous |
| `reporting-api` | `/document/**` | document service | token required |
| `storage-api` | `/storage/**` | storage service | token required |
| `storage-anonymous-download` | `GET /storage/attachment/downloadforentityandownerbyid/**` | storage service | anonymous |
| `ml-api` | `/ml/**` | ml service | token required |
| `ml-anonymous-download` | `GET /ml/mlmodel/download/**` | ml service | anonymous |
| `ai-signalr` | `GET /ai/hubs/**` | llm service (SignalR) | token required |
| `ai-chat` | `/ai/v1/responses/**` | LiteLLM proxy | token + claim→header transform |
| `ai-api` | `/ai/{entity}/**` | llm service | token required |

Sources: gateway config (`routes`/`clusters`/`transforms` JSON) and
`ballware-apigateway/README.md`.[^1]

## Cross-cutting behavior

- **Anonymous download routes** exist for direct file links (report output,
  attachments) — these are the only unauthenticated routes.[^1]
- **Claim→header transform**: on `ai-chat`, a claim-derived value is injected
  as the LiteLLM key header; the route 403s if the claim is absent.[^1]
- **Alternate token header**: clients that cannot send the standard
  `Authorization` header may use the gateway's token header middleware.[^1]
- **OAuth protected-resource metadata**: the gateway serves
  `/.well-known/oauth-protected-resource` (including `/meta/mcp` and
  `/generic/mcp` variants advertising `metaApi` / `genericApi` scopes) per
  RFC 9728.[^1]
- **Internal service naming**: clusters resolve to Kubernetes-style DNS names
  like `ballware-meta-service.ballware.svc.cluster.local` in k3s deployments
  and to compose service names locally.[^1][^2]

[^1]: `ballware-apigateway/README.md`, `ballware-apigateway/` config (routes/clusters/transforms)
[^2]: `ballware-backend-coolify/README.md`, `ballware-ansible/playbooks/group_vars/all.yml`
