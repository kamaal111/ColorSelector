import React from "react";
import Image from "next/image";

import Page from "@/components/Page";

import useScheme from "@/hooks/useScheme";
import getCurrentAssets from "@/utils/getCurrentAssets";

import styles from "@/styles/Home.module.scss";

export default function Home() {
  const scheme = useScheme();
  const [iPhoneHomeImage, setIPhoneHomeImage] = React.useState<
    typeof import("*.png") | null
  >(null);
  const [iPhoneHomeImageKey, setIPhoneHomeImageKey] = React.useState<
    string | null
  >(null);

  const isDarkMode = scheme === "dark";

  React.useEffect(() => {
    const iPhoneHomeAssetKey: Parameters<typeof getCurrentAssets>[0]["key"] =
      "iphone-home";
    const iPhoneHomeContentKey = `${iPhoneHomeAssetKey}-${isDarkMode}`;
    if (iPhoneHomeImageKey !== iPhoneHomeContentKey) {
      setIPhoneHomeImageKey(iPhoneHomeContentKey);
      getCurrentAssets({
        isDarkMode,
        key: iPhoneHomeAssetKey,
      }).then(setIPhoneHomeImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  return (
    <Page>
      <div className={styles.content}>
        <span>
          <div className={styles["iphone-home-screen-wrapper"]}>
            {iPhoneHomeImage !== null ? (
              // @ts-ignore
              <Image
                src={iPhoneHomeImage}
                alt="iphone home screen"
                fill
                sizes="(max-width: 768px) calc(40vw / 1.85)
                calc(300px / 1.85)"
              />
            ) : null}
          </div>
        </span>
      </div>
    </Page>
  );
}
