# Retro Achievements Library Validator

## Installation

```bash
git clone https://github.com/brckd/retro-achievements-library-validator
cd retro-achievements-library-validator
bun install
```

## Usage

Create a `.env` file in the project directory and provide your [API credentials](https://api-docs.retroachievements.org/getting-started.html#get-your-web-api-key).

```env
USERNAME=...
API_KEY=...
```

| Flag        | Type            | Value                         |
| ----------- | --------------- | ----------------------------- |
| `--path`    | path            | directory containing the roms |
| `--console` | optional string | target console of the roms    |

```bash
bun run index.ts --path ...
bun run index.ts --path ... --console ...
```
