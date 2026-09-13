# AgroOS System Design

## Service boundaries and key entities

| Domain | Key entities |
| --- | --- |
| Identity | User, Organisation, Membership, Role, Permission, AuditEvent |
| Subscription | Plan, Subscription, Invoice, PaymentAttempt, Entitlement |
| Farm | Farm, Zone, CropBatch, Device, TelemetryReading, AlertRule, Alert |
| Commerce | Product, InventoryLot, Cart, Order, OrderLine, Payment, Fulfilment |
| Cooperative | Cooperative, Member, ProcurementRequest, Contribution, SoilSample, LabReport |
| Cold chain | Facility, Chamber, CapacitySlot, Reservation, StoredLot, StockMovement |

Every tenant-owned entity contains an `organisationId`. Cross-organisation sharing is explicit (for example, a member joining a cooperative request or a vendor reserving an operator's chamber) and evaluated through a policy check.

## Core workflows

### Sensor alert

1. A device authenticates to MQTT and publishes a timestamped telemetry message.
2. Ingestion validates identity, schema, unit, timestamp freshness, and duplicate message ID; valid readings are persisted to TimescaleDB.
3. The rules worker evaluates applicable tenant/zone thresholds and opens or updates a deduplicated alert.
4. Notification workers deliver the alert through configured channels and track attempts; a manager acknowledges and resolves it from the client.
5. Device heartbeat gaps create a separate connectivity alert.

### Crop analytics

Telemetry and farm events are aggregated by zone and crop batch. Scheduled jobs calculate condition trends, threshold-excursion duration, and user-entered yield comparisons. Analytics is advisory: it explains inputs and never controls equipment in the MVP.

### Egg order and inventory

Checkout creates an idempotent order in `pending_payment` and reserves stock in a short transaction. The payment webhook is signature-verified and changes the order to confirmed exactly once. If payment fails or the hold expires, stock is released. Allocation and fulfilment changes are auditable; a database constraint and transaction locks prevent inventory from dropping below zero.

### Cooperative procurement

A manager publishes a procurement request with deadline and quantity rules. Eligible members commit quantities; the system records their contribution, notifies on changes, and exposes an aggregate demand view to the manager. Supplier confirmation produces per-member allocations. Soil reports are private to the submitting farm unless the owner explicitly shares them.

### Cold-storage booking

A customer requests a chamber/time interval and quantity. A serialisable capacity check sums confirmed reservations plus the candidate request for the overlapping interval. The system applies a temporary hold during payment/approval, then confirms or releases it. Intake creates stored lots and immutable stock movements; dispatch decrements only available lot quantity.

## REST API conventions

- Version all endpoints under `/api/v1`; use resource-oriented paths such as `/farms`, `/devices`, `/orders`, `/cooperatives`, and `/storage-reservations`.
- Use OAuth-compatible bearer tokens, organisation context, pagination, filtering, and ISO 8601 UTC timestamps.
- Require idempotency keys for checkout, reservation, payment, and webhook-triggering mutations.
- Return standard problem-details errors with a stable code, safe message, correlation ID, and field errors when applicable.
- Accept payment, delivery, lab, and device callbacks only through signed, replay-protected endpoints.

## Security and reliability

- Enforce role-based and tenant-scoped authorisation at the service layer; log security-sensitive events.
- Encrypt data in transit and at rest; issue short-lived device credentials; rotate integration secrets.
- Maintain append-only audit records for inventory, booking, payment, access, and report-sharing events.
- Queue slow or retryable work (notifications, exports, webhooks, aggregates) with exponential backoff and dead-letter handling.
- Use health checks, metrics, structured logs, traces, database backups, and tested restore procedures.

## Failure handling

| Failure | Behaviour |
| --- | --- |
| Device disconnect | Flag missed heartbeat, retain last known reading, notify only after configurable grace period. |
| Payment failure | Keep order/reservation pending only for its hold window, release capacity or inventory, show retry status. |
| Duplicate webhook/message | Use provider event IDs/message IDs and idempotent state transitions. |
| Oversell attempt | Reject or waitlist the line; never confirm a negative-stock allocation. |
| Capacity conflict | Return availability conflict before confirmation and keep the user’s hold only until expiry. |
| Unauthorised request | Deny without disclosing tenant data; log a security audit event. |
