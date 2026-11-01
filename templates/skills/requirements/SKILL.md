---
name: requirements
description: Manage project requirements tracked in REQUIREMENTS.md at the repo root. Use when the user asks what requirements are pending, wants to add, refine, implement, or discard a requirement, or mentions REQ-XXX ids, features, tasks, or roadmap items.
---

Requirements live in `REQUIREMENTS.md` at the project root. If it doesn't exist yet, create it using [template.md](template.md).

## List pending requirements

Read `REQUIREMENTS.md` and list all entries under `## Pending` with their status and description.

## Add a new requirement

Append under `## Pending` with the next `REQ-XXX` number and status `pending`, then ask clarifying questions to define acceptance criteria.

## Refine a requirement

Update the description and acceptance criteria in place.

## Implement a requirement

Implement the changes, referencing the `REQ-XXX` id in the commit message and PR description, then move the entry to `## Implemented` with the PR number.

## Discard a requirement

Move the entry to `## Discarded` with the reason provided.
