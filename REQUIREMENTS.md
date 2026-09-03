# Requirements

This file is the source of truth for project requirements. AI agents must read it at the start of every session and keep it updated as requirements evolve.

## How to work with this file (for devs and AI agents)

**List requirements:**
> Dev: "What requirements are pending?"
> AI: reads this file and lists all entries under `## Pending` with their status and description.

**Add a new requirement:**
> Dev: "Add a requirement: users should be able to export their case files as PDF."
> AI: appends under `## Pending` with the next REQ-XXX number, status `pending`, and asks clarifying questions to define acceptance criteria.

**Refine a requirement:**
> Dev: "Refine REQ-001: approval should also notify the user by email."
> AI: updates the description and criteria in place.

**Implement a requirement:**
> Dev: "Implement REQ-001."
> AI: implements the changes and moves REQ-001 to `## Implemented` with the PR number when done.

**Discard a requirement:**
> Dev: "Discard REQ-001, we changed direction."
> AI: moves it to `## Discarded` with the reason provided.

---

## Pending

## Implemented

## Discarded
