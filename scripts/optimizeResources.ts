const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function main() {
  console.time("execution");

  await copyDirectoryRecursively("resources", "public");

  const publicAssetsPath = "public/assets";
  const publicAssetsContent = await fs.promises.readdir(publicAssetsPath);
  const pngsInAssets = publicAssetsContent
    .filter((filepath: string) => filepath.endsWith(".png"))
    .map((filepath: string) => path.join(publicAssetsPath, filepath));
  await Promise.all(
    pngsInAssets.map((filepath: string) => fs.promises.rm(filepath))
  );
  await Promise.all(
    pngsInAssets.map((filepath: string) =>
      compress(filepath.replace("public", "resources"), filepath)
    )
  );

  console.timeEnd("execution");
}

async function compress(source: string, destination: string) {
  return new Promise((resolve, reject) => {
    sharp(source)
      .png({
        quality: 95,
        compressionLevel: 9,
        adaptiveFiltering: true,
        force: true,
      })
      .withMetadata()
      .toFile(destination, (error: Error, info: any) => {
        if (error != null) {
          reject(error);
          return;
        }

        resolve(info);
      });
  });
}

async function copyDirectoryRecursively(
  source: string,
  destinationPath: string
) {
  const destinationExists = fs.existsSync(destinationPath);
  if (destinationExists) {
    await fs.promises.rm(destinationPath, { recursive: true, force: true });
  }

  const sourceStats = await fs.promises.stat(source);
  if (!sourceStats.isDirectory()) {
    await fs.promises.copyFile(source, destinationPath);
    return;
  }

  await fs.promises.mkdir(destinationPath);
  const directoryContent = await fs.promises.readdir(source);

  await Promise.all(
    directoryContent.map((childItemName: string) =>
      copyDirectoryRecursively(
        path.join(source, childItemName),
        path.join(destinationPath, childItemName)
      )
    )
  );
}

main();
