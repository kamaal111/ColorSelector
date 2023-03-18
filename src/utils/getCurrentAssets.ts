const assetCache: Record<string, Promise<typeof import("*.png")>> = {};

function getCurrentAssets({
  isDarkMode,
  key,
}: {
  isDarkMode: boolean;
  key: "iphone-home" | "mac-home";
}) {
  const cacheKey = `${key}-${isDarkMode}`;
  if (assetCache[cacheKey] != null) {
    return assetCache[cacheKey];
  }

  let asset: Promise<typeof import("*.png")>;
  switch (key) {
    case "iphone-home":
      if (isDarkMode) {
        asset = import("../../public/assets/iphone-home-screen-dark.png");
      } else {
        asset = import("../../public/assets/iphone-home-screen-light.png");
      }
      break;
    case "mac-home":
      if (isDarkMode) {
        asset = import("../../public/assets/mac-home-screen-dark.png");
      } else {
        asset = import("../../public/assets/mac-home-screen-light.png");
      }
      break;
  }

  assetCache[cacheKey] = asset;
  return asset;
}

export default getCurrentAssets;
