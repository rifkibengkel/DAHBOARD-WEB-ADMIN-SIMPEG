import { api, apiSSR } from "@/libs/commons";

const RedirectPage = () => {
  return <></>;
};

export const getServerSideProps = apiSSR(async (context, session) => {
  const getMenu = await api
    .get("/master/menu", {
      headers: {
        Authorization: session.token,
      },
    })
    .then((res) => res.data.data);

  if (getMenu.length === 0) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: getMenu[0].path,
      permanent: false,
    },
  };
});

export default RedirectPage;
