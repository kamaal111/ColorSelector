const assetCache: Record<
  string,
  Promise<typeof import("*.png") | typeof import("*.svg")>
> = {};

export enum AssetKeys {
  iPhoneHome = "iphone-home",
  macHome = "mac-home",
  iOSAppStore = "ios-app-store",
  macAppStore = "mac-app-store",
}

function getAsset({
  isDarkMode,
  key,
}: {
  isDarkMode: boolean;
  key: AssetKeys;
}) {
  const cacheKey = `${key}-${isDarkMode}`;
  if (assetCache[cacheKey] != null) {
    return assetCache[cacheKey];
  }

  let asset: Promise<typeof import("*.png") | typeof import("*.svg")>;
  switch (key) {
    case AssetKeys.iPhoneHome:
      if (isDarkMode) {
        asset = import("../../public/assets/iphone-home-screen-dark.png");
      } else {
        asset = import("../../public/assets/iphone-home-screen-light.png");
      }
      break;
    case AssetKeys.macHome:
      if (isDarkMode) {
        asset = import("../../public/assets/mac-home-screen-dark.png");
      } else {
        asset = import("../../public/assets/mac-home-screen-light.png");
      }
      break;
    case AssetKeys.iOSAppStore:
      if (isDarkMode) {
        asset = import("../../public/assets/app-store-black.svg");
      } else {
        asset = import("../../public/assets/app-store-white.svg");
      }
      break;
    case AssetKeys.macAppStore:
      if (isDarkMode) {
        asset = import("../../public/assets/mac-store-black.svg");
      } else {
        asset = import("../../public/assets/mac-store-white.svg");
      }
      break;
  }

  assetCache[cacheKey] = asset;
  return asset;
}

export default getAsset;
