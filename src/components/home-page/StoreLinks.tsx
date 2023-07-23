import React from "react";

import useScheme from "@/hooks/useScheme";
import StoreLink from "./StoreLink";

import styles from "@/styles/components/home-page/StoreLinks.module.scss";

import appStoreBlack from "../../../public/assets/app-store-black.svg";
import appStoreWhite from "../../../public/assets/app-store-white.svg";

function StoreLinks() {
  const scheme = useScheme();

  const isDarkMode = scheme === "dark";

  return (
    <span className={styles["store-links"]}>
      <StoreLink image={isDarkMode ? appStoreBlack : appStoreWhite} />
    </span>
  );
}

export default StoreLinks;
