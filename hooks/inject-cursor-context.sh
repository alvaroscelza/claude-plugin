#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${CURSOR_PLUGIN_ROOT:-}" ]]; then
    ROOT="$CURSOR_PLUGIN_ROOT"
elif [[ -n "${CLAUDE_PLUGIN_ROOT:-}" ]]; then
    ROOT="$CLAUDE_PLUGIN_ROOT"
else
    ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fi

node -e '
const fs = require("fs");
const claudeMd = fs.readFileSync(process.argv[1], "utf8");
const skillsDir = process.argv[2];
const skills = "\n## Skills\n\nBefore acting, discover skills under `" + skillsDir + "`. List every `SKILL.md` under that directory, read each frontmatter `name` and `description`, and when a description matches the task, read that skill in full and follow it before acting.\n";
process.stdout.write(JSON.stringify({additional_context: claudeMd + skills}));
' "$ROOT/CLAUDE.md" "$ROOT/skills"
