# AgroOS Architecture

## Architecture principles

- Modular by domain, shared by platform capability.
- Tenant isolation and least-privilege access by default.
- Event-driven for telemetry, notifications, payments, and inventory changes.
- API-first interfaces so web, mobile, and future partners share the same business rules.

## Logical architecture

```text
Web (Next.js) / Mobile (React Native) / Partner API
                    |
             API gateway + BFF
                    |
 Identity | Billing | Farms | Commerce | Coop | Cold Chain | Analytics
                    |
   PostgreSQL + PostGIS | TimescaleDB | Redis | Object storage
                    |
 MQTT broker -> IoT ingestion -> event bus -> rules/notifications
                    |
 Payments | SMS/WhatsApp | Push | Soil labs | Delivery partners
```

## Platform and domain services

| Layer | Responsibilities |
| --- | --- |
| Clients | Role-aware web/mobile experience, offline-tolerant field actions, device setup flows. |
| API gateway / BFF | API versioning, request authentication, rate limits, response composition. |
| Identity and tenancy | Users, organisations, memberships, roles, session tokens, tenant boundaries. |
| Billing | Plans, subscriptions, invoices, payment status, feature entitlements. |
| Farm domain | Farms, zones, crop batches, devices, telemetry, alert rules, crop analytics. |
| Commerce domain | Product catalogue, price, inventory, checkout, orders, refunds, delivery updates. |
| Cooperative domain | Members, pooled requests, contributions, suppliers, soil-test cases and reports. |
| Cold-chain domain | Facilities, chambers, capacity calendars, reservations, lots, stock movements. |
| Notification service | Template delivery, preferences, retries, delivery audit. |
| Analytics service | Read models, scheduled aggregates, tenant-scoped reporting. |

## Data and integration boundaries

- **PostgreSQL with PostGIS** stores transactional, tenant, catalogue, order, booking, and geospatial data.
- **TimescaleDB** stores append-oriented telemetry and time-series aggregates; raw and roll-up retention is policy-driven.
- **Redis** supports caching, idempotency keys, short-lived booking/order holds, and job coordination.
- **Object storage** retains lab reports, invoices, images, and exports; database records retain metadata and access policy.
- **MQTT** accepts authenticated device messages. The ingestion service validates payloads and emits normalised telemetry events.
- Integrations are adapter-based: Razorpay (or equivalent) for INR payments, SMS/WhatsApp/push providers, lab report feeds, and delivery webhooks.

## Deployment model

Containerised services run on Kubernetes with separate environments for development, staging, and production. Stateless APIs scale horizontally; workers consume queues independently; databases use managed backups and replicas. Secrets are injected from a managed secret store, not client applications or source control.
