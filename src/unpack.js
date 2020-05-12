const fs = require("fs");
const SmartBuffer = require("smart-buffer").SmartBuffer;

for (let i = 2; i < process.argv.length; i++) {
  const buff = SmartBuffer.fromBuffer(
    fs.readFileSync(process.argv[i]),
    "utf-8"
  );
  const line_count = buff.readUInt32LE();
  const meta = [];
  const strings = [];

  for (let i = 0; i < line_count; i++)
    meta.push([buff.readUInt32LE(), buff.readUInt32LE()]);

  for (let i = 0; i < line_count; i++) {
    const [offset, size] = meta[i];
    buff.readOffset = offset;
    strings.push(buff.readString(size).replace(/\n/g, "{$}"));
  }

  fs.writeFileSync(process.argv[i] + ".txt", strings.join("\n"), {
    encoding: "utf-8",
  });
}
