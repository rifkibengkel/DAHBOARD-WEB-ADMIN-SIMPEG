import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import { api, apiSSR } from "@/libs/commons";
import { useOvertimeApproveList } from "@/swr/overtime";
import { usePageFilter } from "@/hooks/filter";
import { Layout } from "@/components/Layout";
import { VerifOvertimeHeader, VerifOvertimeTable } from "@/pagesComponents/VerifOvertime/Components";
import { VerifOvertimePageProps } from "@/pagesComponents/VerifOvertime/VerifOvertime.types";

const ModalVerifOvertime = dynamic(() => import("@/pagesComponents/VerifOvertime/Components/Modal"), { ssr: false });

const VerifOvertimePage = (props: VerifOvertimePageProps) => {
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
    type: -1,
    orderBy: "",
    sort: "desc",
  };

  const { pagination, filter } = usePageFilter(getPagination, getFilter);

  const { keys, data, page, countPage, totalPage, totalPerPage, isLoading, isError } = useOvertimeApproveList(pagination, filter);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <VerifOvertimeHeader overtime_type={props.overtime_type} />
        </Grid>
        <Grid item xs={12}>
          <VerifOvertimeTable
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
      <ModalVerifOvertime keys={keys} />
    </>
  );
};

VerifOvertimePage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  const getOvertimeType = await api.get("/master/overtime/type");

  return {
    props: {
      overtime_type: getOvertimeType.data.data,
    },
  };
});

export default VerifOvertimePage;
