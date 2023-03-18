import useMediaQuery from "./useMediaQuery";

function useMaxWidthQuery({
  value,
  unit = "px",
}: {
  value: number;
  unit?: "px";
}) {
  return useMediaQuery(`(max-width: ${value}${unit})`);
}

export default useMaxWidthQuery;
