# claude

Shared conventions and skills for Claude Code and Cursor. Other agents are not supported.

## Why

Working with Claude Code across multiple repositories, the same setup kept getting repeated by hand in each one: custom commands, agents, hooks, and permission tweaks. This repo centralizes that configuration so it can be maintained once and installed anywhere instead of copy-pasted between projects.

## How it works

- `CLAUDE.md` at the repo root holds the base conventions loaded into every project's context.
- Plugin root `CLAUDE.md` files are not auto-loaded. Each tool has a session-start hook that injects this file.
- A project's own `CLAUDE.md`, if it has one, still loads normally on top of this. The plugin's conventions act as a base template, not a replacement.
- Multi-step procedures live in `skills/`. `skills/requirements/` manages a project's `REQUIREMENTS.md`: creating it from a template when missing, and listing, adding, refining, implementing, or discarding requirements.
- Nothing here edits the host repository's `CLAUDE.md` or `AGENTS.md`.

## Claude Code

This repo is both the plugin and its own marketplace (`.claude-plugin/marketplace.json` lists it with `source: "./"`). From any project, inside Claude Code:

```
/plugin marketplace add alvaroscelza/claude-plugin
/plugin install claude-plugin@claude-plugin
```

If it doesn't activate automatically, run `/reload-plugins`.

`hooks/hooks.json` runs `hooks/inject-claude-md.sh` on `SessionStart`. The script prints this repo's `CLAUDE.md` as `additionalContext`. Claude Code loads `skills/` from the installed plugin on its own.

## Cursor

Cursor does not install Claude Code plugins. Hooks in `.claude-plugin` are not read from `.claude/settings.json`, which is where Cursor loads third-party Claude hooks. This repo also ships a Cursor plugin (`.cursor-plugin/plugin.json`) whose `sessionStart` hook is `hooks/cursor-hooks.json`.

Install that plugin once, at user scope, so every host repository gets it:

1. Open Customize in the sidebar.
2. Install this plugin and choose user scope. Project scope limits it to one repository.

Before it is listed in a marketplace, load it locally: copy this repository to `~/.cursor/plugins/local/claude-plugin` and run Developer: Reload Window. Cursor ignores a symlink in that folder when the target sits outside it. Confirm the plugin under Customize. The Hooks tab and the Hooks output channel show whether `sessionStart` ran.

On each new agent conversation the hook runs `hooks/inject-cursor-context.sh`. It returns `additional_context` containing `CLAUDE.md` plus the absolute path of the installed `skills/` directory (`CURSOR_PLUGIN_ROOT/skills`), and Cursor also registers those skills from the plugin manifest. The agent lists every `SKILL.md` there, reads each frontmatter `name` and `description`, and follows a skill whose description matches the task.

`sessionStart` can inject that context. It is fire-and-forget: the agent loop does not wait for the hook, and `continue` is not enforced. Cloud agents defer `sessionStart` until after the first write, because hooks are not loaded while the environment is still read-only, so the context is not present at the true start of a cloud session.

## Status

Early stage — the plugin structure and its contents are still being defined.
