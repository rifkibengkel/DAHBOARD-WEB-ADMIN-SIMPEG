import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { useAbsenceList } from "@/swr/absence";
import { usePageFilter } from "@/hooks/filter";
import { Layout } from "@/components/Layout";
import { AbsenceHeader, AbsenceTable } from "@/pagesComponents/Absence/Components";

const ModalDetailAbsence = dynamic(() => import("@/pagesComponents/Absence/Components/Modal"), { ssr: false });

const AbsencePage = () => {
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

  const { keys, data, page, countPage, totalPage, totalPerPage, isLoading, isError } = useAbsenceList(pagination, filter);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AbsenceHeader />
        </Grid>
        <Grid item xs={12}>
          <AbsenceTable
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
      <ModalDetailAbsence />
    </>
  );
};

AbsencePage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default AbsencePage;
