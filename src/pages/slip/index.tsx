import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { Layout } from "@/components/Layout";
import { SlipHeader, SlipTable } from "@/pagesComponents/Slip/Components";

const SlipPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SlipHeader />
      </Grid>
      <Grid item xs={12}>
        <SlipTable />
      </Grid>
    </Grid>
  );
};

SlipPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default SlipPage;
