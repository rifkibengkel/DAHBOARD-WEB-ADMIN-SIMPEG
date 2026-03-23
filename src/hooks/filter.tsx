import React from "react";
import { useRouter } from "next/router";
import { useUtils } from "@/contexts";

export const usePageFilter = (initialPagination: Pagination, initialFilter: Filter) => {
  const { states, actions } = useUtils();

  const router = useRouter();

  React.useEffect(() => {
    actions.UPDATE_PAGINATION(initialPagination);
    actions.UPDATE_FILTER(initialFilter);

    const handleRouteChange = (url: string) => url !== router.asPath && actions.CLEAR_STATE();

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return {
    pagination: states.pagination,
    filter: states.filter,
  };
};
