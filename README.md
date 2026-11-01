# claude

A personal plugin that packages shared conventions and skills so any agent can use them in a host repository.

## Why

Working with Claude Code across multiple repositories, the same setup kept getting repeated by hand in each one: custom commands, agents, hooks, and permission tweaks. This repo centralizes that configuration so it can be maintained once and installed anywhere instead of copy-pasted between projects.

## How it works

- `CLAUDE.md` at the repo root holds the base conventions for this repository.
- Skills live in `templates/skills/` and are not registered as Claude Code plugin skills, so they are not loaded twice. `templates/skills/requirements/` manages a project's `REQUIREMENTS.md`: creating it from a template when missing, and listing, adding, refining, implementing, or discarding requirements.
- Nothing in this plugin runs automatically on clone. `setup.sh` copies the skills into a host repository and adds one delimited rule to that repository's `CLAUDE.md` and `AGENTS.md`.

## Using it in another repository

From this repository, run:

```
./setup.sh /path/to/host-repo
```

The host path defaults to the current directory. Run it once per host repository, then commit the generated `.claude/skills/`, `CLAUDE.md`, and `AGENTS.md` there. Run it again to update, and commit whatever changed. The script replaces only skill folders it owns and only its `<!-- claude-plugin:start -->` block, so other skills and the rest of those files stay in place. It does not run git.

## Status

Early stage — the plugin structure and its contents are still being defined.
