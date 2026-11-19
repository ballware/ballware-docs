---
title: Administration overview
---

# Administration overview

This instance documents the environment of ballware that is **evidenced by the
documented repositories**: the evaluation/integration stack
`ballware-docker-compose`, plus configuration and operations facts derivable
from the eight documented repos and their CI pipelines.

- [Environments](/administration/environments) — what is documented, and what is not
- [Evaluation with Docker Compose](/administration/evaluation-compose) — full stack on one machine, built from `main`
- [Configuration reference](/administration/configuration-reference) — env/section names per component (names only, never values)
- [Operations](/administration/operations) — startup order, health checks, upgrades, release model

:::caution Status: production tooling out of scope
Production hosting and operations (Coolify deployment repos, Ansible k3s
automation, backup automation) live in repositories outside the documented
scope. Production operations pages will be added only if that scope is opened
deliberately.[^1]
:::

[^1]: see the scope note on [Repositories](/docs/repositories)
