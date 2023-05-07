const fs = require("fs");
const path = require("path");

async function copyRecursiveSync(src: string, dest: string) {
  if (fs.existsSync(dest)) {
    await fs.promises.rm(dest, { recursive: true, force: true });
  }

  const isDirectory: boolean = (await fs.promises.stat(src)).isDirectory();

  if (isDirectory) {
    await fs.promises.mkdir(dest);
    const directoryContent = await fs.promises.readdir(src);
    await Promise.all(
      directoryContent.map((childItemName: string) =>
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        )
      )
    );
  } else {
    await fs.promises.copyFile(src, dest);
  }
}

copyRecursiveSync("resources", "public");
