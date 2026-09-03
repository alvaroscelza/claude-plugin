# CLAUDE.md

## Coding Conventions
- Follow DRY, SOLID, OOP and Robert C. Martin's Clean Code principles:
  - Avoid comments as much as possible: use clean code that self-explains instead.
  - Helper methods must be organized immediately after the methods that use them, in the order they are called.
  - Empty lines:
      - Use between: methods, functions, classes, imports, and logical sections of files.
      - Don't use inside: method/function bodies (if needed, extract helper methods to respect SRP).
      - Exception: tests MUST follow AAA pattern with empty lines separating Arrange, Act, Assert sections.
  - Imports always at the top of the file.
- Never create new md files to explain things you could explain on chat.
- Keep responses concise, don't waste tokens unnecessarily, unless explicitly requested to.
- Take as much advantage of line width when using dicts and lists. Example:
    ```
    const {container} = renderWithProviders(
    <AdBanner />
    )
    ```
    can be written in one line as `const {container} = renderWithProviders(<AdBanner />)`
- Use four spaces for indentation.
- Don't nest classes, functions or methods.
- Before starting work on a new PR, check if the current branch was already merged into `main`. If so, create a new branch from `main`. Never accumulate work from multiple PRs on the same branch.

## Requirements Management
Project requirements live in `REQUIREMENTS.md` at the repo root. Always read it at the start of a session or when the user mentions features, tasks, or roadmap items.

When working with requirements:
- **Adding**: append under `## Pending` with the next REQ-XXX number and status `pending`
- **Refining**: update the description and criteria in place
- **Implementing**: move to `## Implemented` with the PR number when done
- **Discarding**: move to `## Discarded` with a brief reason

When asked to implement a requirement, reference its REQ-XXX id in the commit message and PR description.
