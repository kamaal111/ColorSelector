import React from "react";
import Image from "next/image";

import useScheme from "@/hooks/useScheme";
import getAsset, { type AssetKeys } from "@/utils/getAsset";

import styles from "@/styles/components/home-page/AppScreenshots.module.scss";

type Devices = "iphone" | "mac";

const sizesMap: Record<Devices, string> = {
  iphone: "(max-width: 768px) calc(40vw / 1.85), calc(300px / 1.85)",
  mac: "(max-width: 768px) 60vw, 400px",
};

function AppScreenshots() {
  const [images, setImages] = React.useState<
    Record<Devices, typeof import("*.png") | null>
  >({ iphone: null, mac: null });
  const [imageKeys, setImageKeys] = React.useState<
    Record<Devices, string | null>
  >({ iphone: null, mac: null });

  const scheme = useScheme();

  const isDarkMode = scheme === "dark";

  async function fetchImages() {
    let contents: Record<Devices, typeof import("*.png") | null> = {
      iphone: null,
      mac: null,
    };
    for (const device of ["iphone", "mac"] as Devices[]) {
      const homeAssetKey: Parameters<typeof getAsset>[0]["key"] =
        `${device}-home` as AssetKeys;
      const homeContentKey = `${homeAssetKey}-${isDarkMode}`;
      if (imageKeys[device] === homeContentKey) {
        continue;
      }

      setImageKeys({ ...imageKeys, [device]: homeContentKey });
      let content: Awaited<typeof import("*.png")>;
      try {
        content = await getAsset({
          isDarkMode,
          key: homeAssetKey,
        });
      } catch (error) {
        console.error(`Failed to load image with error; error=${error}`);
        setImageKeys({ ...imageKeys, [device]: null });
        continue;
      }

      contents = { ...contents, [device]: content };
    }

    setImages(contents);
  }

  React.useEffect(() => {
    if (scheme != null) {
      fetchImages();
    }
    // this is enough
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  return (
    <span className={styles.images}>
      {Object.entries(images)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([key, value]) => {
          if (value === null) {
            // @ts-ignore don't know what to do with this
            return <React.Fragment key={key} />;
          }

          return (
            <div key={key} className={styles[`${key}-home-screen-wrapper`]}>
              {/* @ts-ignore don't know what to do with this */}
              <Image
                src={value}
                alt={`${key} home screen`}
                fill
                sizes={sizesMap[key as Devices]}
              />
            </div>
          );
        })}
    </span>
  );
}

export default AppScreenshots;
