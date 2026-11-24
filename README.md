# portable-memory

> Benchmark results: _coming soon_

Portable, file-based memory for AI assistants: keep what your assistant knows about you in plain files you own, and carry it between tools.

## The problem

Every assistant keeps its own private memory. Switch tools and you start over; nothing is inspectable or exportable.

## 5-minute quickstart

```sh
git clone https://github.com/rumaiz-ahmed/portable-memory.git
cd portable-memory
cp .env.example .env      # add your keys
npm install
npm test
```

Memory lives in `memory/` as Markdown files. Anything in `memory/private/` is git-ignored.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Questions and ideas go in GitHub Discussions.

## License

[AGPL-3.0](LICENSE)
