const fs = require("fs");
const path = require("path");

const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT;
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();

if (!pluginRoot) {
    process.stderr.write("CLAUDE_PLUGIN_ROOT is not set\n");
    process.exit(1);
}

syncHostSkillsRule(pluginRoot, projectDir);
process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: fs.readFileSync(path.join(pluginRoot, "CLAUDE.md"), "utf8")
    }
}));

function syncHostSkillsRule(pluginRoot, projectDir) {
    if (samePath(pluginRoot, projectDir)) return;
    const block = skillsDiscoveryBlock(path.join(pluginRoot, "skills"));
    for (const fileName of ["CLAUDE.md", "AGENTS.md"]) {
        const filePath = path.join(projectDir, fileName);
        const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
        const next = upsertSkillsDiscoveryBlock(current, block);
        if (next !== current) fs.writeFileSync(filePath, next);
    }
}

function samePath(left, right) {
    return resolveExisting(left) === resolveExisting(right);
}

function resolveExisting(target) {
    const resolved = path.resolve(target);
    try {
        return fs.realpathSync(resolved);
    } catch {
        return resolved;
    }
}

function skillsDiscoveryBlock(skillsDir) {
    return [
        "<!-- claude-plugin:skills-discovery -->",
        "## Plugin skills",
        "",
        "Before acting, discover skills under `" + skillsDir + "`. List every `SKILL.md` under that directory, read each frontmatter `name` and `description`, and when a description matches the request, read that skill in full and follow it before acting.",
        "<!-- /claude-plugin:skills-discovery -->",
        ""
    ].join("\n");
}

function upsertSkillsDiscoveryBlock(content, block) {
    const match = /<!-- claude-plugin:skills-discovery -->[\s\S]*?<!-- \/claude-plugin:skills-discovery -->\n?/.exec(content);
    if (!match) return appendSkillsDiscoveryBlock(content, block);
    const without = content.replace(/<!-- claude-plugin:skills-discovery -->[\s\S]*?<!-- \/claude-plugin:skills-discovery -->\n?/g, "");
    return without.slice(0, match.index) + block + without.slice(match.index);
}

function appendSkillsDiscoveryBlock(content, block) {
    let next = content;
    if (next.length > 0 && !next.endsWith("\n")) next += "\n";
    if (next.length > 0 && !next.endsWith("\n\n")) next += "\n";
    return next + block;
}
