# Tradeoffs & Engineering Decisions

## Overview

This document outlines the major engineering tradeoffs made during development of the Salary Management Tool.

The primary goal of the project was to build:

* a clean and maintainable system
* production-structured architecture
* realistic engineering quality
* scalable foundations without overengineering

The implementation intentionally balances:

* simplicity
* scalability
* developer experience
* maintainability
* assignment scope

instead of maximizing technical complexity.

---

# Core Philosophy

The guiding philosophy for this project was:

> "Use the simplest solution that remains maintainable and scalable for the problem size."

Several engineering decisions intentionally avoided unnecessary abstraction or enterprise-level complexity because the application scope does not justify them.

---

# 1. SQLite vs PostgreSQL

## Decision

Used:

* SQLite

Instead of:

* PostgreSQL
* MySQL
* cloud-managed databases

---

## Why SQLite?

* zero infrastructure setup
* easier evaluator onboarding
* lightweight and fast
* sufficient for 10,000 employees
* ideal for local execution

For this scale:
SQLite performs extremely well.

---

## Tradeoff

### Benefits

* simplicity
* fast setup
* minimal operational overhead
* easier portability

### Downsides

* limited write concurrency
* less production scalability
* weaker analytics capabilities compared to PostgreSQL

---

## Mitigation

The architecture isolates database access through repositories, making future migration realistic if scaling requirements grow.

---

# 2. Raw SQL vs ORM

## Decision

Used:

* raw SQLite queries

Instead of:

* Prisma
* Sequelize
* TypeORM

---

## Why Raw SQL?

Reasons:

* project size is small
* simple schema
* better query transparency
* easier analytics aggregation control
* reduced dependency complexity

---

## Tradeoff

### Benefits

* lightweight
* predictable queries
* lower abstraction overhead
* better SQL visibility

### Downsides

* manual query maintenance
* less schema tooling
* fewer type-safe DB guarantees

---

## Mitigation

The repository layer centralizes queries to keep SQL isolated and maintainable.

---

# 3. React Query vs Redux

## Decision

Used:

* React Query

Instead of:

* Redux
* Zustand
* MobX

---

## Why React Query?

Most application state is:

* server-state
* async API data

React Query already solves:

* caching
* loading states
* mutation management
* refetching
* async synchronization

Redux would introduce significant unnecessary boilerplate for this scope.

---

## Tradeoff

### Benefits

* cleaner architecture
* reduced complexity
* simpler async handling
* less boilerplate

### Downsides

* less suitable for highly complex client-state
* less centralized non-server state

---

## Mitigation

The application intentionally keeps client-state minimal.

---

# 4. No Component Library

## Decision

Built lightweight reusable components manually.

Did not use:

* Material UI
* Ant Design
* Chakra UI

---

## Why?

The application is intentionally small.

Custom reusable components were sufficient:

* Button
* Input
* Card
* Table
* Modal

This keeps:

* dependency size low
* styling flexibility high
* implementation lightweight

---

## Tradeoff

### Benefits

* smaller bundle
* simpler customization
* reduced dependency overhead

### Downsides

* fewer prebuilt accessibility features
* more manual styling work

---

## Mitigation

Components were intentionally kept:

* simple
* reusable
* consistent

If the application scaled further, a component library like shadcn/ui would likely be introduced.

---

# 5. Minimal Testing vs Heavy Coverage

## Decision

Focused on:

* API integration tests
* critical UI rendering tests

Instead of:

* exhaustive unit testing
* excessive snapshot testing
* ultra-high coverage targets

---

## Why?

The assignment prioritizes:

* engineering clarity
* maintainability
* practical development

not enterprise-scale test suites.

Integration-style route tests already validate:

* routing
* validation
* controllers
* services
* repositories
* database integration

which provides strong confidence without excessive complexity.

---

## Tradeoff

### Benefits

* faster development
* simpler maintenance
* higher practical value

### Downsides

* lower isolated unit coverage
* fewer edge-case-specific tests

---

## Mitigation

Critical business flows remain covered:

* CRUD
* analytics
* validation
* rendering

---

# 6. Modular Monorepo vs Separate Repositories

## Decision

Used:

* monorepo

Instead of:

* separate frontend/backend repositories

---

## Why?

Benefits:

* synchronized contracts
* easier local development
* simpler project structure

For assignment scale:
a monorepo significantly improves developer experience.

---

## Tradeoff

### Benefits

* simpler onboarding
* consistent tooling

### Downsides

* less deployment isolation
* potentially larger repository

---

## Mitigation

The project remains small enough that monorepo complexity is minimal.

---

# 7. No Authentication System

## Decision

Authentication was intentionally excluded.

---

## Why?

The assignment focuses primarily on:

* employee management
* salary analytics
* architecture quality

Adding:

* JWT
* RBAC
* auth flows

would significantly increase scope without improving evaluation quality.

---

## Tradeoff

### Benefits

* faster delivery
* reduced complexity
* cleaner focus

### Downsides

* not production-secure
* no role separation

---

## Future Path

Authentication could later be added modularly without restructuring the application.

---

# 8. Simple Pagination Strategy

## Decision

Used:

* offset pagination

Instead of:

* cursor pagination

---

## Why?

For 10,000 employees:
offset pagination is completely acceptable.

Cursor pagination would add unnecessary implementation complexity.

---

## Tradeoff

### Benefits

* simpler implementation
* easier debugging
* easier frontend integration

### Downsides

* weaker performance at massive scale

---

## Mitigation

Future migration to cursor pagination remains possible if dataset size increases dramatically.

---

# 9. Tailwind CSS vs Traditional CSS

## Decision

Used:

* Tailwind CSS

Instead of:

* CSS Modules
* Styled Components
* Sass

---

## Why?

Tailwind improves:

* development speed
* consistency
* maintainability
* responsiveness

for all applications.

---

## Tradeoff

### Benefits

* fast UI iteration
* reduced CSS maintenance
* utility consistency

### Downsides

* verbose class names
* styling inside JSX

---

## Mitigation

Reusable components help reduce Tailwind repetition.

---

# 10. Analytics Computed at Runtime

## Decision

Analytics are generated through runtime aggregation queries.

Instead of:

* precomputed analytics
* materialized views
* caching layers

---

## Why?

Dataset size is small enough that runtime aggregation is efficient.

Adding:

* Redis
* scheduled jobs
* caching systems

would overcomplicate the solution.

---

## Tradeoff

### Benefits

* simpler architecture
* real-time analytics
* easier maintenance

### Downsides

* less scalable for huge datasets

---

## Mitigation

Indexes were added to optimize aggregation queries.

---

# 12. Avoiding Premature Optimization

Several advanced patterns were intentionally NOT implemented:

* microservices
* CQRS
* event sourcing
* advanced dependency injection
* generic repositories
* domain-driven design layers
* websocket synchronization
* enterprise caching systems

---

## Why?

These patterns:

* increase cognitive load
* slow development
* reduce reviewer readability
* are unnecessary for the assignment scope

The implementation prioritizes:

* clarity
* maintainability
* practical engineering

instead of architectural maximalism.

---

# Final Perspective

The project intentionally optimizes for:

* assignment realism
* maintainable architecture
* engineering clarity
* practical scalability
* reviewer readability

rather than maximizing technical complexity.

The final implementation aims to demonstrate:

* strong fundamentals
* thoughtful tradeoffs
* scalable structure
* production-minded development

while remaining appropriately scoped for the problem being solved.
