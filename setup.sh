#!/usr/bin/env bash
set -euo pipefail

main() {
    if [[ $# -gt 1 ]]; then
        printf 'usage: ./setup.sh [host-repo]\n' >&2
        exit 1
    fi
    local plugin_root host_arg host
    plugin_root="$(cd "$(dirname "$0")" && pwd)"
    host_arg="${1:-.}"
    if [[ ! -d "$host_arg" ]]; then
        printf 'host repo not found: %s\n' "$host_arg" >&2
        exit 1
    fi
    host="$(cd "$host_arg" && pwd)"
    sync_skills "$plugin_root/templates/skills" "$host/.claude/skills"
    sync_instructions "$host"
}

sync_skills() {
    local source_root="$1" dest_root="$2" entry name dest
    if [[ ! -d "$source_root" ]]; then
        printf 'missing %s\n' "$source_root" >&2
        exit 1
    fi
    mkdir -p "$dest_root"
    shopt -s nullglob
    for entry in "$source_root"/*; do
        name="$(basename "$entry")"
        dest="$dest_root/$name"
        if [[ -e "$dest" ]] && diff -rq "$entry" "$dest" >/dev/null; then
            continue
        fi
        rm -rf "$dest"
        cp -R "$entry" "$dest"
    done
}

sync_instructions() {
    local host="$1"
    python3 - "$host" <<'PY'
import os
import re
import sys

host = sys.argv[1]
block = """<!-- claude-plugin:start -->
## Skills

Every agent, Claude or not, must list every `.claude/skills/*/SKILL.md` at the start of the session. Read each frontmatter `name` and `description`. When a description matches the task, read that skill in full and follow it before acting.
<!-- claude-plugin:end -->
"""
pattern = re.compile(r"<!-- claude-plugin:start -->.*?<!-- claude-plugin:end -->\n?", re.S)

def upsert(path):
    current = open(path, encoding="utf-8").read() if os.path.exists(path) else ""
    text = block if block.endswith("\n") else block + "\n"
    matches = list(pattern.finditer(current))
    if not matches:
        next_content = current
        if next_content and not next_content.endswith("\n"):
            next_content += "\n"
        if next_content and not next_content.endswith("\n\n"):
            next_content += "\n"
        next_content += text
    else:
        pieces = [current[:matches[0].start()], text]
        cursor = matches[0].end()
        for match in matches[1:]:
            pieces.append(current[cursor:match.start()])
            cursor = match.end()
        pieces.append(current[cursor:])
        next_content = "".join(pieces)
    if next_content != current:
        with open(path, "w", encoding="utf-8") as handle:
            handle.write(next_content)

upsert(os.path.join(host, "CLAUDE.md"))
upsert(os.path.join(host, "AGENTS.md"))
PY
}

main "$@"
