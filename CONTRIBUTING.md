# Semantic Commit Messages Cheat Sheet

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to ensure a clean, readable, and automated project history.

## Commit Structure

`<type>`[optional scope][!]: `<description>`

[optional body]

[optional footer(s)]


## Decision Tree: Choosing the Right Type

Read from top to bottom. Ask yourself the question, and if the answer is yes, use that type.

| Question (Ask yourself...) | If Yes → Use Type |
| :--- | :--- |
| Are you undoing a previous commit? | **revert:** |
| Does it patch a bug or fix an error? | **fix:** |
| Does it introduce new functionality, UI, or API endpoints? | **feat:** |
| Is the change specifically to improve execution speed or performance? | **perf:** |
| Does it restructure or clean up code *without* changing behavior? | **refactor:** |
| Does it only add, update, or correct tests? | **test:** |
| Does it strictly affect documentation (e.g., README, OpenAPI)? | **docs:** |
| Is it purely code formatting (e.g., spaces, quotes, running a linter)? | **style:** |
| Does it affect the build system or dependencies (e.g., Composer, npm, Docker)? | **build:** |
| Does it affect CI/CD configuration files and pipelines? | **ci:** |
| Is it routine maintenance, tooling, or minor tasks? | **chore:** |
| **Modifiers (Apply to the type chosen above)** | |
| Does the change affect a specific, isolated part of the codebase? | Add **`(scope)`** |
| Does the change break backward compatibility? | Add **`!`** |

## Examples

* **Feature with scope:** `feat(auth): implement JWT login endpoint`
* **Bug fix:** `fix: resolve N+1 query issue in user dashboard`
* **Breaking change:** `feat(api)!: change primary key from integer to UUID`
* **Documentation:** `docs: add setup instructions for local database`
* **Refactor:** `refactor(services): extract payment logic from controller`
