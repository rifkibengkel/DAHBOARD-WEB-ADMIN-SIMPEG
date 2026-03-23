import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { Layout } from "@/components/Layout";
import { ApelHeader, ApelTable } from "@/pagesComponents/Apel/Components";

const ApelPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ApelHeader />
      </Grid>
      <Grid item xs={12}>
        <ApelTable />
      </Grid>
    </Grid>
  );
};

ApelPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default ApelPage;
