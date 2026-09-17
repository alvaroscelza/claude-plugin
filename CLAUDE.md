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
- Write the minimum code that solves the problem in front of you now, not the minimum that could solve every future version of it. Resist premature abstraction, skip error handling for errors that cannot occur, and hardcode values until there is a real reason to configure them. The test: if the only reason something is abstracted is "in case we need to," you have over-built it. Do not create things "just in case", always create the minimum amount of code to complete the need. "It will have", "it will implement", .keep files, are all symptoms of things we don't need now, don't add them.
- Always commit and push every change to the branch being worked on. Never leave anything uncommitted or unpushed in the local environment.

## Requirements Management
Requirements must be managed in a `REQUIREMENTS.md` file at the project root. Create it if it doesn't exist, and use the corresponding skill to maintain it.

## Pull requests
- Never close developers comments when answering them, the developer must be able to see them open, see your answer and choose whether they want to close it or not.
