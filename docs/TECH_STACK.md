# AgroOS Technology Stack

## Recommended stack

| Concern | Choice | Why |
| --- | --- | --- |
| Web application | Next.js + TypeScript | Fast, accessible role-based dashboards and customer storefronts. |
| Mobile application | React Native + TypeScript | Shared language with web/backend; suitable for field workflows and push alerts. |
| APIs and services | NestJS + TypeScript | Modular domain services, validation, dependency injection, and consistent tooling. |
| Transactional data | PostgreSQL + PostGIS | Reliable transactions plus farm, facility, and delivery-zone geospatial queries. |
| Telemetry | TimescaleDB | PostgreSQL-compatible time-series ingestion, retention, and aggregates. |
| Cache and coordination | Redis | Caching, rate limits, job coordination, idempotency, and short-lived holds. |
| IoT protocol | MQTT broker (EMQX or managed equivalent) | Lightweight authenticated device connectivity and retained device state. |
| Async workloads | Queue/event bus (BullMQ initially; managed bus when scale requires) | Decouples ingestion, notifications, webhooks, and analytics workers. |
| Files | S3-compatible object storage | Secure reports, invoices, images, and exports with lifecycle policies. |
| Authentication | OIDC-compatible provider or NestJS identity service | Phone/email login, JWTs, RBAC, and future partner federation. |
| Payments | Razorpay adapter | INR payments, refunds, and webhook support; keep provider behind an interface. |
| Notifications | FCM plus SMS/WhatsApp provider adapters | Push for operators, reliable fallbacks for critical events. |
| Delivery | Provider adapter layer | Supports regional logistics partners without coupling order logic to one vendor. |
| Deployment | Docker + Kubernetes | Portable environments and independent API/worker scaling. |
| Infrastructure | Terraform | Repeatable cloud environments, networking, secrets references, and managed services. |
| Observability | OpenTelemetry, Prometheus/Grafana, central structured logs | Trace event flows and detect service/device failures. |
| Testing | Jest, Supertest, Playwright, contract tests | Unit, API, end-to-end, and integration reliability. |

## Engineering conventions

- Use a pnpm TypeScript monorepo for shared API types, design components, configuration, and domain contracts.
- Start as a modular monolith with independently deployable workers; extract domain services only when ownership, scaling, or release cadence requires it.
- Publish internal domain events with versioned schemas and use an outbox pattern for transactional event delivery.
- Use database migrations, least-privilege service accounts, encrypted secrets, and automated backup/restore checks.

## Integration contracts

| Integration | Contract |
| --- | --- |
| IoT devices | MQTT over TLS; per-device credentials; versioned JSON payload containing message ID, timestamp, metrics, and firmware version. |
| Payments | Hosted checkout/API creation plus signed webhook events; provider IDs stored for reconciliation and idempotency. |
| Notifications | Internal event + template ID + recipient preference; adapters return provider delivery identifiers. |
| Soil labs | Signed API or validated file upload; report metadata, sample reference, result data/file, and access owner. |
| Delivery partners | Shipment creation/status webhooks behind a provider-neutral shipment interface. |

## Adoption path

Run locally with Docker Compose and managed cloud services in production. Begin with PostgreSQL plus TimescaleDB extension and a single worker queue. Introduce dedicated telemetry infrastructure, a managed event bus, and database read replicas only after observed load or reliability requirements justify them.
