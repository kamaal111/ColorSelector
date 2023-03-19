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
  }, [queryValue]);

  return value;
}

export default useQueryParam;
