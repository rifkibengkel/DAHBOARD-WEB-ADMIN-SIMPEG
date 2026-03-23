import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { Layout } from "@/components/Layout";
import { LeaveHeader, LeaveTable } from "@/pagesComponents/Leave/Components";
import { useState } from "react";

interface Filter {
  name: string;
  status: number;
  typeCuty: number;
  date?: null | string;
}

const LeavePage = () => {
  const [filter, setFilter] = useState<Filter>({
    name: "",
    status: -1,
    typeCuty: -1,
    date: null,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <LeaveHeader filter={filter} setFilter={setFilter} />
      </Grid>
      <Grid item xs={12}>
        <LeaveTable filter={filter} />
      </Grid>
    </Grid>
  );
};

LeavePage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default LeavePage;
