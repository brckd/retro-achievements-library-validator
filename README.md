# Retro Achievements Library Validator

## Installation

```bash
git clone https://github.com/brckd/retro-achievements-library-validator
cd retro-achievements-library-validator
bun install
```

## Usage

| Flag        | Type            | Value                         |
| ----------- | --------------- | ----------------------------- |
| `--path`    | path            | directory containing the roms |
| `--console` | optional string | target console of the roms    |

```bash
bun run index.ts --path <path>
bun run index.ts --path <path> --console <console>
```
