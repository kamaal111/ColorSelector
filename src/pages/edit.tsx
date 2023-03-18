import React from "react";

import Page from "@/components/Page";

import styles from "@/styles/Edit.module.scss";

function EditScreen() {
  const [rgb, setRgb] = React.useState({ red: 152, green: 129, blue: 123 });

  return (
    <Page>
      <div className={styles.content}>
        <div
          className={styles["color-preview"]}
          style={{
            backgroundColor: `rgba(${rgb.red},${rgb.green},${rgb.blue},1)`,
          }}
        />
      </div>
    </Page>
  );
}

export default EditScreen;
