import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { useWfhList } from "@/swr/wfh";
import { usePageFilter } from "@/hooks/filter";
import { Layout } from "@/components/Layout";
import { WfhHeader, WfhTable } from "@/pagesComponents/Wfh/Components";
import { useState } from "react";
import { ListWfh } from "@/pagesComponents/Wfh/Wfh.types";

const ModalVerifWfh = dynamic(() => import("@/pagesComponents/Wfh/Components/Modal"), { ssr: false });

const WfhPage = () => {
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
    type: "",
    orderBy: "",
    sort: "desc",
  };

  const [filterNew, setFilterNew] = useState<ListWfh>({
    id: "",
    employeName: "",
    departement: "",
    clockIn: "",
    date: null,
    status: -1,
    statusText: "",
  });

  const { pagination, filter } = usePageFilter(getPagination, getFilter);

  const { keys, data, page, countPage, totalPage, totalPerPage, isLoading, isError } = useWfhList(pagination, filter);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WfhHeader filterNew={filterNew} setFilterNew={setFilterNew} />
        </Grid>
        <Grid item xs={12}>
          <WfhTable
            keys={keys}
            data={data}
            page={page}
            countPage={countPage}
            totalPage={totalPage}
            totalPerPage={totalPerPage}
            isLoading={isLoading}
            isError={isError}
            filterNew={filterNew}
            setFilterNew={setFilterNew}
            // filterNew={{
            //   id: "",
            //   employeName: "",
            //   departement: "",
            //   clockIn: "",
            //   date: "",
            //   status: 0,
            //   statusText: "",
            // }}
          />
        </Grid>
      </Grid>
      <ModalVerifWfh keys={keys} />
    </>
  );
};

WfhPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default WfhPage;
