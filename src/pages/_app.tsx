import "@/styles/globals.scss";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // @ts-ignore React typing is just straight broken
  return <Component {...pageProps} />;
}
