# Requirements

This file is the source of truth for project requirements. AI agents must read it at the start of every session and keep it updated as requirements evolve.

## Pending

## Implemented

### REQ-001
Status: implemented
Pull request: https://github.com/alvaroscelza/claude-plugin/pull/5

Agents other than Claude Code must discover this plugin's skills the same way Claude does. `setup.sh` copies `templates/skills/` into the host `.claude/skills/` and adds a delimited block to the host `CLAUDE.md` and `AGENTS.md`. The block tells every agent to list `.claude/skills/*/SKILL.md` at session start and follow a skill whose description matches the task. Nothing runs automatically on clone. Existing host content stays intact, and the user commits the result.

## Discarded
