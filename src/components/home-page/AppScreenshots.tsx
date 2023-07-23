import React from "react";
import Image from "next/image";

import useScheme from "@/hooks/useScheme";

import styles from "@/styles/components/home-page/AppScreenshots.module.scss";

import macHomeDark from "@/../public/assets/mac-home-screen-dark.png";
import macHomeLight from "@/../public/assets/mac-home-screen-light.png";
import iPhoneHomeDark from "@/../public/assets/iphone-home-screen-dark.png";
import iPhoneHomeLight from "@/../public/assets/iphone-home-screen-light.png";

function AppScreenshots() {
  const scheme = useScheme();

  const isDarkMode = scheme === "dark";

  return (
    <span className={styles.images}>
      <div className={styles["mac-home-screen-wrapper"]}>
        <Image
          src={isDarkMode ? macHomeDark : macHomeLight}
          alt={"mac home screen"}
          fill
          sizes={"(max-width: 768px) 60vw, 400px"}
        />
      </div>
      <div className={styles["iphone-home-screen-wrapper"]}>
        <Image
          src={isDarkMode ? iPhoneHomeDark : iPhoneHomeLight}
          alt={"iphone home screen"}
          fill
          sizes={"(max-width: 768px) calc(40vw / 1.85), calc(300px / 1.85)"}
        />
      </div>
    </span>
  );
}

export default AppScreenshots;
