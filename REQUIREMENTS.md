# Requirements

This file is the source of truth for project requirements. AI agents must read it at the start of every session and keep it updated as requirements evolve.

## Pending

## Implemented

### REQ-001
Status: implemented
Pull request: https://github.com/alvaroscelza/claude-plugin/pull/5

Only Claude Code and Cursor are supported. Claude Code installs this plugin and gets `CLAUDE.md` from the `SessionStart` hook, plus `skills/` from the plugin manifest. Cursor does not install Claude plugins, so the Cursor plugin's `sessionStart` hook injects `CLAUDE.md` and the installed skills directory as `additional_context`. Host `CLAUDE.md` and `AGENTS.md` are not modified.

## Discarded
