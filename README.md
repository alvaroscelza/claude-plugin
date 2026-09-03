# claude

A personal Claude Code plugin that packages the configuration I keep re-adding to every project — slash commands, subagents, hooks, and settings — into a single reusable, installable plugin.

## Why

Working with Claude Code across multiple repositories, the same setup kept getting repeated by hand in each one: custom commands, agents, hooks, and permission tweaks. This repo centralizes that configuration so it can be maintained once and installed anywhere instead of copy-pasted between projects.

## How it works

- `CLAUDE.md` at the repo root holds the base conventions I want loaded into every project's context, the same way a project's own `CLAUDE.md` would be.
- Plugin root `CLAUDE.md` files aren't auto-loaded by Claude Code, so a `SessionStart` hook (`hooks/hooks.json` + `hooks/inject-claude-md.sh`) reads this file and injects it as `additionalContext` at the start of every session in a project that has this plugin installed.
- A project's own `CLAUDE.md`, if it has one, still loads normally on top of this — the plugin's conventions act as a base template, not a replacement.
- Multi-step procedures live in skills instead of `CLAUDE.md`, so they only load when relevant. `skills/requirements/` manages a project's `REQUIREMENTS.md`: creating it from a template when missing, and listing, adding, refining, implementing, or discarding requirements.

## Installing in another project

This repo is both the plugin and its own marketplace (`.claude-plugin/marketplace.json` lists it with `source: "./"`), so no separate marketplace repo is needed. From any project, inside Claude Code:

```
/plugin marketplace add alvaroscelza/claude-plugin
/plugin install claude-plugin@claude-plugin
```

If it doesn't activate automatically, run `/reload-plugins`.

## Status

Early stage — the plugin structure and its contents are still being defined.
