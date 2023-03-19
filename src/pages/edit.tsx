import React from "react";

import Page from "@/components/Page";

import useQueryParam from "@/hooks/useQueryParam";
import styles from "@/styles/Edit.module.scss";

type ConfigurationObject = {
  onClick: () => void;
  value: string | null;
  label: string;
};

function EditScreen() {
  const [rgb, setRgb] = React.useState({ red: 152, green: 129, blue: 123 });

  const colorName = useQueryParam("name");
  const tag = useQueryParam("tag");
  const hex = useQueryParam("hex");

  React.useEffect(() => {
    if (hex != null) {
      console.log("hex", hex);
    }
  }, [hex]);

  const rgbValue = `${rgb.red},${rgb.green},${rgb.blue}`;

  const buttonConfigurations: Record<
    "name" | "tag" | "hex" | "rgb",
    ConfigurationObject
  > = {
    name: {
      onClick: () => console.log("colorName", colorName),
      value: colorName,
      label: "Name",
    },
    tag: {
      onClick: () => console.log("tag", tag),
      value: tag,
      label: "Tag",
    },
    hex: {
      onClick: () => console.log("hex", hex),
      value: (hex as string | null)?.toLocaleUpperCase() ?? null,
      label: "Hex",
    },
    rgb: {
      onClick: () => console.log("rgbValue", rgbValue),
      value: rgbValue,
      label: "RGB",
    },
  };

  return (
    <Page>
      <div className={styles.content}>
        <div
          className={styles["color-preview"]}
          style={{
            backgroundColor: `rgba(${rgbValue},1)`,
          }}
        />
        <div className={styles["copyable-text-section"]}>
          {(
            Object.entries(buttonConfigurations) as [
              keyof typeof buttonConfigurations,
              ConfigurationObject
            ][]
          ).map(([key, value]) => {
            if (value.value == null) {
              // @ts-ignore what's going on? I don't know 🤷‍♂️
              return <React.Fragment key={key} />;
            }

            return (
              <button
                key={key}
                className={styles["copyable-text"]}
                onClick={value.onClick}
              >{`📋 ${value.label}: ${value.value}`}</button>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

export default EditScreen;
