# Retro Achievements Library Validator

## Features

- Scans a directory for valid ROMs
- Suggests alternative ROMs if found
- Supports ZIP archives

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
| `--console` | optional string | The target console of the ROMs    |

```bash
bun run index.ts --path ...
bun run index.ts --path ... --console ...
```

## Logs

| Prefix       | Explanation                                                                |
| ------------ | -------------------------------------------------------------------------- |
| `Valid`     | The ROM was found in the Database and can be used for achievements.        |
| `Invalid`   | The ROM was not found in the Database and cannot be used for achievements. |
| `Available` | ROMs with the same title as the previous invalid ROM were found.           |

> [!WARNING]  
> Validating unsupported systems or file formats will result in false negatives! Always consult the RetroAchievements website for `Invalid` ROMs.