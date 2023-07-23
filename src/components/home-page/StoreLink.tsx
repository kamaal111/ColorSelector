import Image from "next/image";

import styles from "@/styles/components/home-page/StoreLink.module.scss";

function StoreLink({ image }: { image: typeof import("*.svg") }) {
  return (
    <a
      className={styles["store-link"]}
      href="https://apple.co/3gLJDFa"
      target="_blank"
      rel="noreferrer"
    >
      <Image src={image} alt="store link" />
    </a>
  );
}

export default StoreLink;
