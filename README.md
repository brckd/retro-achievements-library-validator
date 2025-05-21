# Retro Achievements Library Validator

## Usage

Clone the project, then inside that project run:

```bash
bun install
```

Create a `.env` file in the project directory and provide your [API credentials](https://api-docs.retroachievements.org/getting-started.html#get-your-web-api-key):

```env
USERNAME=...
API_KEY=...
```

Run the script with the following flags:

| Flag        | Type            | Value                             |
| ----------- | --------------- | --------------------------------- |
| `--path`    | path            | The directory containing the roms |
| `--console` | optional string | The target console of the roms    |

```bash
bun run index.ts --path ...
bun run index.ts --path ... --console ...
```
