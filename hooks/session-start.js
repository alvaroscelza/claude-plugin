const fs = require("fs");
const path = require("path");

const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT;
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const skillsSentence = "Before acting, discover skills under `skills/`.";

if (!pluginRoot) {
    process.stderr.write("CLAUDE_PLUGIN_ROOT is not set\n");
    process.exit(1);
}

const instructions = hostInstructions(pluginRoot);
if (!samePath(pluginRoot, projectDir)) syncHostInstructions(projectDir, instructions);
process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: instructions
    }
}));

function hostInstructions(pluginRoot) {
    const content = fs.readFileSync(path.join(pluginRoot, "CLAUDE.md"), "utf8");
    const parts = content.split(skillsSentence);
    if (parts.length !== 2) {
        process.stderr.write("CLAUDE.md is missing the skills path sentence\n");
        process.exit(1);
    }
    const skillsDir = path.join(pluginRoot, "skills");
    return parts[0] + "Before acting, discover skills under `" + skillsDir + "`." + parts[1];
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

function syncHostInstructions(projectDir, instructions) {
    const block = markedBlock(instructions);
    for (const fileName of ["CLAUDE.md", "AGENTS.md"]) {
        const filePath = path.join(projectDir, fileName);
        const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
        const next = upsertMarkedBlock(current, block);
        if (next !== current) fs.writeFileSync(filePath, next);
    }
}

function markedBlock(body) {
    const text = body.endsWith("\n") ? body : body + "\n";
    return "<!-- claude-plugin:claude-md -->\n" + text + "<!-- /claude-plugin:claude-md -->\n";
}

function upsertMarkedBlock(content, block) {
    const match = /<!-- claude-plugin:claude-md -->[\s\S]*?<!-- \/claude-plugin:claude-md -->\n?/.exec(content);
    if (!match) return appendMarkedBlock(content, block);
    const without = content.replace(/<!-- claude-plugin:claude-md -->[\s\S]*?<!-- \/claude-plugin:claude-md -->\n?/g, "");
    return without.slice(0, match.index) + block + without.slice(match.index);
}

function appendMarkedBlock(content, block) {
    let next = content;
    if (next.length > 0 && !next.endsWith("\n")) next += "\n";
    if (next.length > 0 && !next.endsWith("\n\n")) next += "\n";
    return next + block;
}
