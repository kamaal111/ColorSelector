import React from "react";
import { useRouter } from "next/router";

function useQueryParam(key: string) {
  const [value, setValue] = React.useState<string | null>(null);

  const router = useRouter();

  const queryValue = router.query[key];

  React.useEffect(() => {
    if (queryValue != null && queryValue !== value) {
      setValue(queryValue as string);
    }
    // this is enough
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryValue]);

  return value;
}

export default useQueryParam;
