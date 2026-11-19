---
title: MCP endpoints
sidebar_position: 4
---

# MCP endpoints

Two services expose [Model Context Protocol](https://modelcontextprotocol.io)
endpoints so AI agents can discover application metadata and query tenant
data through structured tools instead of raw REST calls.[^1][^2]

| Endpoint | Service | Purpose |
| --- | --- | --- |
| `/meta/mcp` | meta service | metadata discovery tools |
| `/generic/mcp` | generic service | tenant data query tools |

Both are mounted behind the gateway (see [Route map](/api/route-map)) and
authenticated with normal user tokens; the gateway publishes
OAuth protected-resource metadata advertising `metaApi` (meta) and
`genericApi` (generic) scopes.[^3]

## Meta MCP (`/meta/mcp`)

Static tools named `ballware_meta_<subject>_<action>`, e.g.
`ballware_meta_entity_list`, `ballware_meta_entity_by_identifier`, plus
lookup, page, pick value, processing state, statistic, and tenant tools. Each
tool is gated by a dedicated right following the usual
`<application>.<entity>.<action>` grammar with application `mcp` (for example
`mcp.entity.view`).[^4]

## Generic MCP (`/generic/mcp`)

Enabled via `Mcp.Enabled`. Tools are **generated dynamically per
authenticated user**: for every accessible tenant and entity, each saved
query flagged `AiEnabled` becomes a read-only tool named[^1]

```text
generic_{tenantId}_{entity.Identifier}_query_{query.Identifier}
```

so an agent sees exactly the tenant's data views the user's rights allow.[^1][^2]

:::caution Status: not consistent across environments
The generic service configures the MCP required scope via
`Mcp.RequiredMcpScope` (defaulting to the service's meta scope), while the
production gateway metadata advertises `genericApi` for `/generic/mcp`.
Verify the effective scope for the environment you target.[^1][^3]
:::

[^1]: `ballware-generic-service/README.md`, `ballware-generic-service/src/Ballware.Generic.Mcp/Endpoints/GenericTools.cs`
[^2]: `ballware-shared-dotnet/src/Ballware.Shared.Mcp/Internal/ToolRegistry.cs`
[^3]: `ballware-apigateway/README.md`
[^4]: `ballware-meta-service/src/Ballware.Meta.Mcp/Endpoints/EntityTools.cs` (static tool registration), `ballware-meta-service/src/Ballware.Meta.Service/Startup.cs` (`/meta/mcp` endpoint)
