import {
  buildAuthorization,
  getConsoleIds,
  getGameHashes,
  getGameList,
} from "@retroachievements/api";
import { parseArgs } from "util";
import { Glob } from "bun";
import decompress from "decompress";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    path: {
      type: "string",
    },
    console: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

const path = values.path;
if (!path) {
  throw new Error("No path provided!");
}
const consoleName = values.console ?? path;

const username = Bun.env.USERNAME;
const webApiKey = Bun.env.API_KEY;
if (!username || !webApiKey) {
  throw new Error("Insufficient credentials provided!");
}
const authorization = buildAuthorization({ username, webApiKey });

const consoleIds = await getConsoleIds(authorization);
const consoleId = consoleIds
  .filter((v) => consoleName.includes(v.name))
  .sort((a, b) => b.name.length - a.name.length)[0]?.id;
if (consoleId === undefined) {
  throw new Error(
    `Invalid console name!\nAvailable: ${consoleIds.map((v) => v.name).join(", ")}`,
  );
}

const glob = new Glob("**/*");
const paths = glob.scan({ cwd: path, absolute: true });
const games = await getGameList(authorization, {
  consoleId,
  shouldRetrieveGameHashes: true,
});

for await (const path of paths) {
  const data = await Bun.file(path).bytes();
  if (path.endsWith(".zip")) {
    const files = await decompress(Buffer.from(data));
    for await (const { path, data } of files) {
      matchFile({ path, data: data.buffer });
    }
  } else {
    await matchFile({ path, data: data.buffer });
  }
}

async function matchFile({
  path,
  data,
}: {
  path: string;
  data: ArrayBufferLike;
}) {
  const validGame = await matchHash(data);
  const invalidGame = validGame || matchTitle(path);
  if (validGame) {
    console.log(`Valid: ${path}`);
  } else if (invalidGame) {
    const hashes = await getGameHashes(authorization, {
      gameId: invalidGame.id,
    });
    console.error(
      `Invalid: ${path}\nAvailable: ${hashes.results.map((v) => v.name).join(", ")}`,
    );
  } else {
    console.error(`Invalid: ${path}`);
  }
}

async function matchHash(data: ArrayBufferLike) {
  const hash = new Bun.CryptoHasher("md5").update(data).digest().toHex();
  let game = games.find((v) => v.hashes?.some((v) => v.toLowerCase() === hash));
  return game;
}

function matchTitle(path: string) {
  const title = path
    .replace(/.*\/([^/]+)\.\w+$/, "$1")
    .replace(/\s+[\(\[].+$/, "");
  let game = games.find(
    (v) => v.title.replaceAll(/\W/g, "") === title.replaceAll(/\W/g, ""),
  );
  return game;
}
