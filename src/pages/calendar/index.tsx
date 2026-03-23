import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { Layout } from "@/components/Layout";
import { CalendarHeader } from "@/pagesComponents/Calendar/Components";

const CalendarPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CalendarHeader />
      </Grid>
    </Grid>
  );
};

CalendarPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default CalendarPage;
