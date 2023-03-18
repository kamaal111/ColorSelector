import React from "react";

import Page from "@/components/Page";
import AppScreenshots from "@/components/home-page/AppScreenshots";
import StoreLinks from "@/components/home-page/StoreLinks";

import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <Page>
      <div className={styles.content}>
        <AppScreenshots />
        <StoreLinks />
      </div>
    </Page>
  );
}
