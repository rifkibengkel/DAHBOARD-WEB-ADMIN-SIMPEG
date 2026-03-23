import useSWR from "swr";
import { apiSWR } from "@/libs/commons";
import { useUnauthorized } from "@/hooks/unauthorized";

export const useWfhList = (pagination: Pagination, filter: Filter) => {
  const getPage = `page=${pagination.page}`;
  const getLimit = `&limit=${pagination.limit}`;
  const getSearch = filter.search ? `&search=${filter.search}` : "";
  const getStatus = filter.status !== "" ? `&status=${filter.status}` : "";
  const getStartDate = filter.startDate ? `&startDate=${filter.startDate}` : "";
  const getEndDate = filter.endDate ? `&endDate=${filter.endDate}` : "";

  const getQuery = `${getPage}${getLimit}${getSearch}${getStatus}${getStartDate}${getEndDate}`;
  const getKeys = filter.isSet ? `/api/wfh/list?${getQuery}` : null;

  const { data, isLoading, error } = useSWR(getKeys, apiSWR, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  useUnauthorized(data?.statusCode);

  return {
    keys: getKeys,
    data: data?.data?.raw ? data.data.raw : [],
    page: data?.data?.page ? data.data.page : pagination.page,
    countPage: data?.data?.totalData ? data.data.totalData : 0,
    totalPage: data?.data?.totalPage ? data.data.totalPage : 1,
    totalPerPage: data?.data?.totalPerPage ? data.data.totalPerPage : pagination.limit,
    isLoading: isLoading,
    isError: error,
  };
};
