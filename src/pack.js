const fs = require("fs");
const SmartBuffer = require("smart-buffer").SmartBuffer;

for (let i = 2; i < process.argv.length; i++) {
  const strings = fs
    .readFileSync(process.argv[i], { encoding: "utf8" })
    .split("\n")
    .map((s) => s.replace(/\{\$\}/g, "\n"));

  const utf8len = (str) => Buffer.from(str).length;
  const buff = new SmartBuffer();
  const table_start_offset = strings.length * 8 + 4;

  buff.writeUInt32LE(strings.length);

  let counter = 0;
  for (let string of strings) {
    const len = utf8len(string);
    buff.writeUInt32LE(table_start_offset + counter);
    buff.writeUInt32LE(len);
    counter += len;
  }

  for (let string of strings) buff.writeString(string);

  fs.writeFileSync(process.argv[i] + ".bin", buff.toBuffer());
}
