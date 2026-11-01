# Requirements

This file is the source of truth for project requirements. AI agents must read it at the start of every session and keep it updated as requirements evolve.

## Pending

## Implemented

### REQ-001
Status: implemented
Pull request: https://github.com/alvaroscelza/claude-plugin/pull/5

Agents other than Claude Code, working in a repository where this plugin is installed or copied, must discover its skills the same way Claude does: list every `SKILL.md`, read each frontmatter `name` and `description`, and when a description matches the request, read that skill in full and follow it before acting. The rule is in this plugin's `CLAUDE.md`. The setup script copies that file into the host root `CLAUDE.md` and `AGENTS.md`, and the copied rule points at the installed plugin `skills` directory rather than a `skills/` folder in the host. Existing content in those files stays intact.

## Discarded
