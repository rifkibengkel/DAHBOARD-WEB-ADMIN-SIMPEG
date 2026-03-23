import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import BaseDrawer from "../Drawer";
import { logout } from "@/hooks/unauthorized";

const SnackbarNotification = dynamic(() => import("@/components/Snackbar/Notification"), { ssr: false });

type LayoutProps = {
  children: React.ReactElement;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [menu, setMenu] = React.useState<Menu[] | never[]>([]);

  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user && menu.length === 0) {
          const [userResponse, menuResponse] = await Promise.all([
            fetch("/api/user", { method: "GET" }),
            fetch("/api/master/list_menu", { method: "GET" }),
          ]);

          if (userResponse.status === 200) {
            const userData = await userResponse.json();
            setUser(userData.data);
          } else if (userResponse.status === 403) {
            await logout(router);
          }

          if (menuResponse.status === 200) {
            const menuData = await menuResponse.json();
            setMenu(menuData.data);
          } else if (menuResponse.status === 403) {
            await logout(router);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <Head>
        <title>Simpeg - Admin</title>
      </Head>
      {user && (
        <Box
          sx={{
            width: "100vw",
            minHeight: "100vh",
          }}
        >
          <BaseDrawer user={user} menu={menu}>
            {children}
          </BaseDrawer>
        </Box>
      )}
      <SnackbarNotification />
    </>
  );
};

export default Layout;
