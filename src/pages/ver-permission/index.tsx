import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import { api, apiSSR } from "@/libs/commons";
import { usePermissionApproveList } from "@/swr/permission";
import { usePageFilter } from "@/hooks/filter";
import { Layout } from "@/components/Layout";
import { VerifPermissionHeader, VerifPermissionTable } from "@/pagesComponents/VerifPermission/Components";
import { VerifPermissionPageProps } from "@/pagesComponents/VerifPermission/VerifPermission.types";

const ModalVerifPermission = dynamic(() => import("@/pagesComponents/VerifPermission/Components/Modal"), { ssr: false });

const VerifPermissionPage = (props: VerifPermissionPageProps) => {
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
    type: 1,
    orderBy: "",
    sort: "desc",
  };

  const { pagination, filter } = usePageFilter(getPagination, getFilter);

  const { keys, data, page, countPage, totalPage, totalPerPage, isLoading, isError } = usePermissionApproveList(pagination, filter);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <VerifPermissionHeader permission_type={props.permission_type} />
        </Grid>
        <Grid item xs={12}>
          <VerifPermissionTable
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
      <ModalVerifPermission keys={keys} />
    </>
  );
};

VerifPermissionPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps = apiSSR(async () => {
  const getPermissionType = await api.get("/master/permission-category");

  return {
    props: {
      permission_type: getPermissionType.data.data,
    },
  };
});

export default VerifPermissionPage;
