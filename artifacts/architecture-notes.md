# Architecture Notes

## Overview

This project is a minimal yet production-structured Salary Management Tool designed for an organization with 10,000 employees.

The application supports:

* Employee CRUD management
* Salary analytics
* Country/job-title insights
* Search/filtering
* Pagination
* HR dashboard metrics

The focus of this implementation was:

* clean architecture
* maintainability
* scalability without overengineering
* strong engineering fundamentals
* realistic production-ready structure

---

# High-Level Architecture

The project follows a modular monorepo architecture.

```txt
root/
├── apps/
│   ├── api/
│   └── web/
│
├── artifacts/
└── README.md
```

---

# Why Monorepo?

A monorepo was chosen because:

* frontend/backend contracts remain synchronized
* development experience becomes simpler
* scaling the application later becomes easier

For a project of this size, this approach gives structure without adding unnecessary complexity.

---

# Backend Architecture

## Stack

* Node.js
* Express
* TypeScript
* SQLite

---

## Backend Design Pattern

The backend follows:

* MVC Architecture
* Modular Architecture
* Service-Based Architecture

Structure:

```txt
modules/
├── employee/
└── analytics/
```

Each module contains:

* controller
* service
* repository
* routes
* validators
* types

Example:

```txt
employee/
├── employee.controller.ts
├── employee.service.ts
├── employee.repository.ts
├── employee.routes.ts
├── employee.validator.ts
└── employee.types.ts
```

---

# Why MVC?

MVC was selected because it:

* cleanly separates concerns
* improves maintainability
* keeps business logic isolated
* prevents controller bloat

Responsibilities:

| Layer      | Responsibility   |
| ---------- | ---------------- |
| Controller | HTTP handling    |
| Service    | Business logic   |
| Repository | Database queries |
| Validator  | Input validation |

---

# Why Repository Layer?

A repository layer was added even though SQLite is simple.

Benefits:

* isolates SQL queries
* keeps services clean
* makes future DB migration easier
* improves testability

Without repositories, SQL would leak into business logic.

---

# Why SQLite?

SQLite was selected because:

* lightweight and fast
* sufficient for 10,000 employee records
* zero infrastructure setup
* ideal for local evaluation

Indexes were added for:

* country
* job_title
* country + job_title

to optimize analytics queries.

---

# Database Design

Main table:

```sql
employees
```

Core fields:

* id
* full_name
* email
* country
* salary
* job_title
* department
* timestamps

The schema intentionally avoids over-normalization because:

* project size is small
* joins are unnecessary
* simplicity improves readability

---

# Seed Strategy

The assignment explicitly mentioned:

* 10,000 employees
* engineers will run seed regularly
* performance matters

Optimizations implemented:

* transaction-based inserts
* prepared statements
* bulk insert strategy
* lightweight random generation

This keeps seeding extremely fast.

---

# Frontend Architecture

## Stack

* React
* TypeScript
* Tailwind CSS
* React Query
* React Hook Form

---

# Frontend Structure

```txt
src/
├── components/
├── modules/
├── hooks/
├── services/
├── providers/
├── routes/
└── tests/
```

---

# Why Modular Frontend?

Features are grouped by domain:

```txt
modules/
├── employees/
└── analytics/
```

Benefits:

* feature isolation
* easier scalability
* reduced coupling
* better maintainability

This structure also mirrors backend modules.

---

# Why React Query?

React Query was selected because most application state is server-state.

Benefits:

* API caching
* loading states
* automatic refetching
* mutation management
* simplified async handling

Alternative options like Redux/Zustand were intentionally avoided because:

* application complexity is small
* global client-state is minimal
* Redux would be unnecessary overhead

---

# Why React Hook Form?

React Hook Form was chosen because:

* lightweight
* performant
* minimal re-renders
* simple API
* ideal for CRUD forms

It keeps forms clean without introducing large abstractions.

---

# Why Tailwind CSS?

Tailwind was selected because:

* fast development
* consistent spacing/styling
* minimal CSS maintenance
* ideal for small/medium apps

The application intentionally avoids:

* CSS-in-JS
* heavy styling systems
* design token complexity

---

# Why No Component Library?

The application intentionally avoids component libraries.

Reason:

* assignment scope is small
* custom reusable components were sufficient
* avoids unnecessary dependency weight

Instead, a lightweight Common Component system was built:

* Button
* Input
* Card
* Table
* Modal

If this application were larger or team-scaled, a component library like shadcn/ui would likely be introduced for:

* accessibility consistency
* design standardization
* developer velocity

---

# Testing Strategy

The project intentionally focuses on:

* API route tests
* integration-style confidence
* realistic test coverage

Instead of excessive unit testing.

Backend:

* Vitest
* Supertest

Frontend:

* React Testing Library
* Vitest

The testing approach prioritizes:

* business-critical flows
* maintainability
* confidence without overengineering

---

# Analytics Design

Analytics were separated into their own module.

Reason:

* prevents employee CRUD coupling
* isolates aggregation logic
* improves scalability

Implemented analytics:

* min salary
* max salary
* average salary
* country insights
* department insights
* job-title insights

---

# Error Handling Strategy

Frontend:

* centralized axios interceptor
* toast notifications

Backend:

* controller-level error handling
* validation-based failures

This keeps errors predictable and user-friendly.

---

# Scalability Considerations

Although the application is intentionally lightweight, the architecture supports future scaling.

Possible future improvements:

* authentication/authorization
* role management
* pagination metadata
* advanced filtering
* charts/visualization libraries
* Dockerization
* PostgreSQL migration
* CI/CD pipelines
* caching layer
* audit logs

---

# Performance Considerations

Optimizations implemented:

* indexed SQLite queries
* React Query caching
* lightweight component architecture
* modular rendering
* bulk database inserts

The application performs comfortably for the assignment scale.

---

# Tradeoffs Made

## Avoided Overengineering

Not implemented intentionally:

* Redux
* ORMs
* microservices
* advanced design systems
* complex state management
* enterprise abstractions

Reason:

* assignment size does not justify them

---

# Development Philosophy

The implementation aimed to balance:

* simplicity
* scalability
* readability
* engineering quality

The goal was not to build the most complex system possible, but to build:

* a maintainable system
* a realistic production-ready structure
* an interview-quality codebase
* a clean developer experience
