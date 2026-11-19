---
title: MCP endpoints
sidebar_position: 4
---

# MCP endpoints

Two services expose [Model Context Protocol](https://modelcontextprotocol.io)
endpoints so AI agents can discover application metadata and query tenant
data through structured tools instead of raw REST calls:[^1][^2]

| Endpoint | Service | Mounted at |
| --- | --- | --- |
| `/meta/mcp` | meta service | `Startup.cs` — mapped whenever the `Mcp` options are configured |
| `/generic/mcp` | generic service | `Startup.cs` — mapped only when `Mcp.Enabled` is true |

Both authenticate with normal user tokens through an OAuth protected-resource
middleware (`UseBallwareMcpOAuthProtectedResource`, meta). The endpoint
plumbing itself (`Tool`/`IToolRegistry`, the mapping extension) comes from the
out-of-scope `Ballware.Shared.Mcp*` packages, so it is described only where a
documented service evidences it.[^1][^2]

## Meta MCP (`/meta/mcp`)

Static tools named `ballware_meta_<subject>_<action>`, per tool class in
`Ballware.Meta.Mcp/Endpoints/`:[^3]

| Subject | Tools |
| --- | --- |
| tenant | `ballware_meta_tenant_current_summary`, `ballware_meta_tenant_current_navigation` |
| entity | `ballware_meta_entity_list`, `ballware_meta_entity_by_identifier` |
| lookup | `ballware_meta_lookup_list`, `ballware_meta_lookup_by_id` |
| page | `ballware_meta_page_list`, `ballware_meta_page_by_identifier` |
| pickvalue | `ballware_meta_pickvalue_availability`, `ballware_meta_pickvalue_selectlistforentityandfield`, `ballware_meta_pickvalue_selectbyvalueforentityandfield` |
| processingstate | `ballware_meta_processingstate_list`, `…_by_id`, `…_listforentity`, `…_bystateforentity`, `…_successorsforentityandstate` |
| statistic | `ballware_meta_statistic_list`, `…_by_id`, `…_metadata_by_identifier` |

Each tool is registered with an authorization handler of the form
`("mcp", <subject>, "view")` — following the usual
`<application>.<entity>.<action>` grammar with application `mcp`.

:::caution Status: not verified
How those handler arguments compose into a literal right string (e.g.
`mcp.entity.view`) happens inside the out-of-scope
`Ballware.Shared.Mcp.Authorization` package.
:::

## Generic MCP (`/generic/mcp`)

Tools are **generated dynamically per authenticated user**: for every tenant
the user is allowed for and every entity, each saved query flagged
`AiEnabled` becomes a read-only tool. Verified naming templates:[^2]

```text
generic_{tenantId}_{entity.Identifier}_query_{query.Identifier}
generic_{tenantId}_{entity.Identifier}_byid_{query.Identifier}
```

Execution re-checks rights inside the tool call using the tenant and entity
rights checkers with action `view` — i.e. the entity's own application rights,
not a dedicated `mcp.*` right.[^2]

## Configuration

- generic: `Mcp.Enabled` gates the endpoint; `Mcp:RequiredMcpScope` /
  `Mcp:ResourceUri` default to the service's meta scope (`metaApi`).[^2]
- meta: `Mcp:RequiredMcpScope` / `Mcp:ResourceUri` are configured under the
  `Mcp` section and mapped together with the protected-resource
  middleware.[^1]

## Protected-resource discovery (gateway)

Where clients reach the MCP endpoints through `ballware-apigateway`, the
gateway serves RFC 9728 protected-resource metadata so MCP clients can resolve
the authorization server and scopes:[^4]

- `GET /.well-known/oauth-protected-resource` and
  `/.well-known/oauth-protected-resource/{**resourcePath}` (anonymous; mapped
  independently of the proxy routes).
- Committed per-resource entries: `/.well-known/oauth-protected-resource/meta/mcp`
  (`scopes_supported: openid profile metaApi`) and
  `/.well-known/oauth-protected-resource/generic/mcp`
  (`scopes_supported: openid profile genericApi`); bearer method `header`.
- When not explicitly configured, `resource` is built from the public request
  URL (honouring `X-Forwarded-Proto`/`X-Forwarded-Host`) and
  `authorization_servers` defaults to the gateway's configured
  `Authorization:Authority`.

:::caution Status: metadata vs. enforcement
The gateway's declared scope for `/generic/mcp` (`genericApi`) can differ from
what the generic service actually enforces (`Mcp:RequiredMcpScope`, which
defaults to `metaApi` there). Treat the discovery metadata as what the
deployment **advertises** and the service configuration as what is
**enforced**.[^2][^4]
:::

[^1]: `ballware-meta-service/src/Ballware.Meta.Service/Startup.cs` (`/meta/mcp` mapping, `Mcp` option wiring)
[^2]: `ballware-generic-service/src/Ballware.Generic.Service/Startup.cs` (`Mcp.Enabled` gate, `/generic/mcp` mapping), `ballware-generic-service/src/Ballware.Generic.Mcp/Endpoints/GenericTools.cs` (tool templates, AiEnabled filtering, right checks)
[^3]: `ballware-meta-service/src/Ballware.Meta.Mcp/Endpoints/` (`TenantTools.cs`, `EntityTools.cs`, `LookupTools.cs`, `PageTools.cs`, `PickvalueTools.cs`, `ProcessingStateTools.cs`, `StatisticTools.cs`)
[^4]: `ballware-apigateway/src/Ballware.ApiGateway.Service/Program.cs` (`:180`, `:188` `.well-known` mappings), `appsettings.json` (`OAuthProtectedResourceRoutes`), `Configuration/OAuthProtectedResourceOptions.cs`, `README.md` (RFC 9728 section)
