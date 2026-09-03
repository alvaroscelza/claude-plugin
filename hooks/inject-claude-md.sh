#!/usr/bin/env bash
set -euo pipefail

CLAUDE_MD="${CLAUDE_PLUGIN_ROOT}/CLAUDE.md"

node -e '
const fs = require("fs");
const content = fs.readFileSync(process.argv[1], "utf8");
process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: content
    }
}));
' "$CLAUDE_MD"
