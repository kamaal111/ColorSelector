const assetCache: Record<string, Promise<typeof import("*.png")>> = {};

function getCurrentAssets({
  isDarkMode,
  key,
}: {
  isDarkMode: boolean;
  key: "iphone-home";
}) {
  let asset: Promise<typeof import("*.png")>;
  const cacheKey = `${key}-${isDarkMode}`;
  if (assetCache[cacheKey] != null) {
    return assetCache[cacheKey];
  }
  switch (key) {
    case "iphone-home":
      if (isDarkMode) {
        asset = import("../../public/assets/iphone-home-screen-dark.png");
      } else {
        asset = import("../../public/assets/iphone-home-screen-light.png");
      }
  }

  assetCache[cacheKey] = asset;
  return asset;
}

export default getCurrentAssets;
