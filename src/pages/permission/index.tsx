import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { Layout } from "@/components/Layout";
import { PermissionHeader, PermissionTable } from "@/pagesComponents/Permission/Components";
import { useState } from "react";

interface Filter {
  employeeName: string;
  status: number;
  typeNumber: number;
  createdAt?: null | string;
}

const PermissionPage = () => {
  const [filter, setFilter] = useState<Filter>({
    employeeName: "",
    status: -1,
    typeNumber: -1,
    createdAt: null,
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PermissionHeader filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid item xs={12}>
          <PermissionTable filter={filter} />
        </Grid>
      </Grid>
    </>
  );
};

PermissionPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default PermissionPage;
