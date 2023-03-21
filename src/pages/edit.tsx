import React from "react";
import { useRouter } from "next/router";
import type { NextPageContext } from "next/types";

import Page from "@/components/Page";

import { getRandomHexColor, hexToRGB } from "@/utils/colors";
import { copyValueToClipboard } from "@/utils/clipboard";
import useQueryParam from "@/hooks/useQueryParam";
import styles from "@/styles/Edit.module.scss";

type ConfigurationObject = {
  value: string | null;
  label: string;
};

function EditScreen({ endpoint }: { endpoint?: string }) {
  const [rgb, setRgb] = React.useState<{
    red: number;
    green: number;
    blue: number;
  } | null>(null);
  const [hex, setHex] = React.useState<string | null>(null);

  const colorName = useQueryParam("name");
  const tag = useQueryParam("tag");

  const router = useRouter();

  function setupHexAndRGB() {
    if (!router.isReady) {
      return;
    }

    const queryHex = router.query.hex as string | undefined;
    if (queryHex) {
      const rgbFromHex = hexToRGB(queryHex);
      if (rgbFromHex != null) {
        setHex(queryHex);
        if (
          rgb === null ||
          rgb.red !== rgbFromHex.red ||
          rgb.green !== rgbFromHex.green ||
          rgb.blue !== rgbFromHex.blue
        ) {
          setRgb(rgbFromHex);
        }
        return;
      }
    }

    const randomHex = getRandomHexColor();
    const rgbFromHex = hexToRGB(randomHex)!;
    setHex(randomHex);
    setRgb(rgbFromHex);
    router.replace({ query: { ...router.query, hex: randomHex } });
  }

  React.useEffect(() => {
    setupHexAndRGB();
  }, [router.isReady]);

  const rgbValue = rgb !== null ? `${rgb.red},${rgb.green},${rgb.blue}` : null;
  const hexValue = (hex as string | null)?.toLocaleUpperCase() ?? null;

  const buttonConfigurations: Record<
    "name" | "tag" | "hex" | "rgb",
    ConfigurationObject
  > = {
    name: {
      value: colorName,
      label: "Name",
    },
    tag: {
      value: tag,
      label: "Tag",
    },
    hex: {
      value: `#${hexValue}`,
      label: "Hex",
    },
    rgb: {
      value: rgbValue,
      label: "RGB",
    },
  };

  return (
    <Page path={endpoint}>
      <div className={styles.content}>
        <div
          className={styles["color-preview"]}
          style={{
            backgroundColor:
              rgbValue !== null ? `rgba(${rgbValue},1)` : undefined,
          }}
        />
        <div className={styles["copyable-text-section"]}>
          {(
            Object.entries(buttonConfigurations) as [
              keyof typeof buttonConfigurations,
              ConfigurationObject
            ][]
          )
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, { value, label }]) => {
              if (value == null) {
                // @ts-ignore what's going on? I don't know 🤷‍♂️
                return <React.Fragment key={key} />;
              }

              return (
                <button
                  key={key}
                  className={styles["copyable-text"]}
                  onClick={() => copyValueToClipboard(value)}
                >{`📋 ${label}: ${value}`}</button>
              );
            })}
        </div>
      </div>
    </Page>
  );
}

export function getServerSideProps(context: NextPageContext) {
  return {
    props: { endpoint: context.req?.url },
  };
}

export default EditScreen;
