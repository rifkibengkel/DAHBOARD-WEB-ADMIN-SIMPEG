import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { Layout } from "@/components/Layout";
import { VerifLeaveHeader, VerifLeaveTable } from "@/pagesComponents/VerifLeave/Components";
import { usePermissionApproveList } from "@/swr/permission";
import { usePageFilter } from "@/hooks/filter";

const ModalVerifLeave = dynamic(() => import("@/pagesComponents/VerifLeave/Components/Modal"), { ssr: false });

const VerifLeavePage = () => {
  const getPagination: Pagination = {
    page: 1,
    limit: 10,
  };

  const getFilter: Filter = {
    isSet: true,
    search: "",
    status: -1,
    startDate: "",
    endDate: "",
    type: 2,
    orderBy: "",
    sort: "desc",
  };

  const { pagination, filter } = usePageFilter(getPagination, getFilter);

  const { keys, data, page, countPage, totalPage, totalPerPage, isLoading, isError } = usePermissionApproveList(pagination, filter);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <VerifLeaveHeader />
        </Grid>
        <Grid item xs={12}>
          <VerifLeaveTable
            keys={keys}
            data={data}
            page={page}
            countPage={countPage}
            totalPage={totalPage}
            totalPerPage={totalPerPage}
            isLoading={isLoading}
            isError={isError}
          />
        </Grid>
      </Grid>
      <ModalVerifLeave keys={keys} />
    </>
  );
};

VerifLeavePage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default VerifLeavePage;
