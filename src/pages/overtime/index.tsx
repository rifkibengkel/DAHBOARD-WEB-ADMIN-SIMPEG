import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { Layout } from "@/components/Layout";
import { OvertimeHeader, OvertimeTable } from "@/pagesComponents/Overtime/Components";

const OvertimePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <OvertimeHeader />
      </Grid>
      <Grid item xs={12}>
        <OvertimeTable />
      </Grid>
    </Grid>
  );
};

OvertimePage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default OvertimePage;
