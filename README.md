# AgroOS

**AgroOS is an India-focused, multi-tenant operating platform for modern agricultural businesses.** It connects farm operations, real-time IoT monitoring, farmer cooperatives, direct sales, and cold-chain capacity in one system.

## Product modules

| Module | Purpose | Primary users |
| --- | --- | --- |
| **HydroGrow** | Monitor hydroponic operations, receive sensor alerts, and analyse crop performance. | Hydroponic farmers, farm managers |
| **FarmFresh Eggs** | Run poultry operations and accept direct-to-consumer orders for premium eggs. | Poultry farmers, consumers |
| **Agri-Coop** | Coordinate cooperative purchasing, soil testing, and shared agricultural insight. | Farmers, cooperative managers |
| **ColdChain Hub** | Discover, reserve, and manage modular cold-storage capacity and inventory. | Farmers, vendors, storage operators |

## Who AgroOS serves

- Farmers and farm managers who need operational visibility and actionable alerts.
- Cooperatives that aggregate demand, manage members, and share services.
- Cold-storage operators who need capacity, booking, and inventory controls.
- Buyers who want traceable, reliable farm products.
- Platform administrators who operate tenants, policies, integrations, and support.

## Why it exists

Agricultural data, post-harvest logistics, procurement, and customer sales are commonly managed in disconnected tools. AgroOS provides shared identity, billing, analytics, and integrations while allowing each business module to evolve independently.

## MVP roadmap

1. **Platform foundation:** multi-tenant identity, roles, organisation setup, audit logs, notifications, subscription billing, and observability.
2. **Farm operations:** HydroGrow telemetry, thresholds, alerts, farm/crop records, analytics; FarmFresh Eggs inventory, catalogue, checkout, and fulfilment.
3. **Network operations:** Agri-Coop membership, pooled purchasing, soil-test reports; ColdChain Hub capacity, reservations, and stock movement.
4. **Connected intelligence:** cross-module dashboards, traceability, forecasting, and partner integrations.

## Documentation

- [Product requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [System design](docs/SYSTEM_DESIGN.md)
- [Technology stack](docs/TECH_STACK.md)

## AgroOS production-platform setup

The current implementation is a Next.js/TypeScript multi-user agriculture platform with Clerk integration, PostgreSQL/TimescaleDB modelling, tenant-scoped RBAC, configurable farming templates, admin operations, customer commerce, analytics, and explainable advisory rules.

1. Install Node.js LTS and pnpm.
2. Copy `.env.example` to `.env`, configure Clerk keys, and replace `SESSION_SECRET` before any shared deployment.
3. Install packages with `pnpm install`.
4. Start TimescaleDB with `docker compose up -d`, create the schema with `pnpm prisma migrate dev --name production_foundation`, then seed it with `pnpm db:seed`.
5. Run `pnpm dev` and open `http://localhost:3000`. When Clerk keys are absent, local demo accounts remain available for evaluation.

## Deployment and safety

The application is Vercel-ready. Set all required database, Clerk, payment, and integration secrets in the deployment environment. AgroOS keeps domain roles in PostgreSQL, verifies Clerk webhooks, applies tenant checks, validates mutations, sends restrictive security headers, and models immutable audit/outbox events. Do not commit `.env` files or production credentials.
