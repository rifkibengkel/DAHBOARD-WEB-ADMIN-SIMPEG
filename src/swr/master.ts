import useSWR from "swr";
import { apiSWR } from "@/libs/commons";
import { useUnauthorized } from "@/hooks/unauthorized";

export const useBranchList = () => {
  const getKeys = `/api/master/list_branch`;

  const { data, isLoading, error } = useSWR(getKeys, apiSWR, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  useUnauthorized(data?.statusCode);

  return {
    keys: getKeys,
    data: data?.data ? data.data : [],
    isLoading: isLoading,
    isError: error,
  };
};
