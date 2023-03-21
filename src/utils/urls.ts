import path from "path";

export enum Paths {
  edit = "edit",
}

export function makeAppArgumentURL({
  path: linkPath,
  params,
}: {
  path?: string;
  params?: Record<string, string>;
}) {
  const url = new URL("https://kamaal.io/colorselector/");
  if (linkPath != null) {
    const newPath = path.join(url.pathname, linkPath);
    url.pathname = newPath;
  }

  if (params != null) {
    const searchParams = new URLSearchParams(params);
    url.search = searchParams.toString();
  }

  return url;
}
