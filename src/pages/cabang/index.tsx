import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import { apiSSR } from "@/libs/commons";
import { useBranchList } from "@/swr/master";
import { Layout } from "@/components/Layout";
import { BranchHeader, BranchTable } from "@/pagesComponents/Branch/Components";

const ModalAddBranch = dynamic(() => import("@/pagesComponents/Branch/Components/ModalAdd"), { ssr: false });
const ModalDetailBranch = dynamic(() => import("@/pagesComponents/Branch/Components/ModalDetail"), { ssr: false });

const BranchPage = () => {
  const { keys, data, isLoading, isError } = useBranchList();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BranchHeader />
        </Grid>
        <Grid item xs={12}>
          <BranchTable keys={keys} data={data} isLoading={isLoading} isError={isError} />
        </Grid>
      </Grid>
      <ModalAddBranch keys={keys} />
      <ModalDetailBranch keys={keys} />
    </>
  );
};

BranchPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  return {
    props: {},
  };
});

export default BranchPage;
