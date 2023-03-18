import React from "react";

import Page from "@/components/Page";
import AppScreenshots from "@/components/home-page/AppScreenshots";

import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <Page>
      <div className={styles.content}>
        <AppScreenshots />
      </div>
    </Page>
  );
}
