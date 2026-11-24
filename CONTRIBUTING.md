# Contributing

Thanks for helping! Questions and ideas: use GitHub Discussions. Bugs and features: Issues.

## Setup and tests
```sh
npm install
npm run lint
npm test
```
Both must pass before you open a PR; CI runs them on every PR.

## Code style
Keep changes small and focused. Match the surrounding code. Lint (`npm run lint`) is the source of truth.

## Opening a PR
1. Fork, branch from `main`.
2. Make your change with tests.
3. Fill in the PR template.
4. Sign off every commit (`git commit -s`), certifying the [DCO](https://developercertificate.org/).

Good first issues are labelled `good first issue`.

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## Commit hooks and commit messages
Run `npm install` first: it installs git hooks (via husky) that check every commit and push.

Messages follow [Conventional Commits](https://www.conventionalcommits.org/): `type: summary`.
```
feat: add memory export command
fix(parser): handle empty front matter
```
Every commit needs a DCO `Signed-off-by:` line. The hooks add it for you; `git commit -s` does too.

Hooks also scan staged files for secrets and block anything in `memory/private/` or real `.env` files.
Before a push they run `tsc --noEmit` and the tests.

CI enforces the same rules (secret scan, types, tests, commit messages), so skipping hooks won't get a PR merged.
