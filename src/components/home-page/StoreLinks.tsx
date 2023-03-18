import React from "react";

import useScheme from "@/hooks/useScheme";
import getAsset, { type AssetKeys } from "@/utils/getAsset";
import StoreLink from "./StoreLink";

import styles from "@/styles/components/home-page/StoreLinks.module.scss";

function StoreLinks() {
  const [images, setImages] = React.useState<typeof import("*.svg")[]>([]);

  const scheme = useScheme();

  const isDarkMode = scheme === "dark";

  async function fetchImages() {
    let contents: typeof import("*.svg")[] = [];
    for (const os of ["ios", "mac"]) {
      const buttonAssetKey: Parameters<typeof getAsset>[0]["key"] =
        `${os}-app-store` as AssetKeys;

      let content: Awaited<typeof import("*.svg")>;
      try {
        content = await getAsset({
          isDarkMode,
          key: buttonAssetKey,
        });
      } catch (error) {
        console.error(`Failed to load image with error; error=${error}`);
        continue;
      }

      contents.push(content);
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
    <span className={styles["store-links"]}>
      {images.map((image, index) => {
        return <StoreLink key={index} image={image} />;
      })}
    </span>
  );
}

export default StoreLinks;
