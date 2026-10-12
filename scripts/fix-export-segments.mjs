// Works around a Windows-only Next.js static export bug: prefetch segment files
// are written as nested folders (`__next.posts/$d$slug/__PAGE__.txt`) because the
// exporter only converts `/` (not `\`) to `.`. The client requests the flat name
// (`__next.posts.$d$slug.__PAGE__.txt`), so we flatten them. No-op on Linux/macOS.
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("out");
let moved = 0;

const flatten = (segmentDir) => {
  const parent = path.dirname(segmentDir);
  const prefix = path.basename(segmentDir); // e.g. "__next.posts"

  const walk = (dir, parts) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, [...parts, entry.name]);
      } else {
        fs.renameSync(full, path.join(parent, [prefix, ...parts, entry.name].join(".")));
        moved++;
      }
    }
  };

  walk(segmentDir, []);
  fs.rmSync(segmentDir, { recursive: true });
};

const visit = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) flatten(full);
    else if (entry.name !== "_next" && entry.name !== "assets") visit(full);
  }
};

if (fs.existsSync(OUT_DIR)) {
  visit(OUT_DIR);
  if (moved > 0) console.log(`fix-export-segments: flattened ${moved} segment files`);
}
