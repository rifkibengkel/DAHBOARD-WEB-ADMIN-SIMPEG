import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar, ListItemText, Menu, MenuItem } from "@mui/material";
import { LockOutlined, PowerSettingsNewOutlined } from "@mui/icons-material";
import { logout } from "@/hooks/unauthorized";

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  borderRight: "none",
  background: "transparent",
  overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...closedMixin(theme),
  "& .MuiDrawer-paper": closedMixin(theme),
}));

const NavbarMenu = [
  {
    icon: LockOutlined,
    name: "Ubah Password",
    isHandle: "change_password",
  },
  {
    icon: PowerSettingsNewOutlined,
    name: "Keluar",
    isHandle: "logout",
  },
];

const BaseDrawer = ({ user, menu, children }: { user: User; menu: Menu[]; children: React.ReactNode }) => {
  const theme = useTheme();
  const router = useRouter();

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const currentPath = router.pathname;

  const handleClickMenu = async (handle: string) => {
    if (handle === "logout") {
      await logout(router);
    }

    if (handle === "change_password") {
    }

    setAnchor(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          background: "#FFFFFF0D",
          border: "1px solid #36597D0D",
          backdropFilter: "blur(20px)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 30px 0px 40px !important",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Image src={"/assets/logo/simpeg_logo.png"} alt="Logo" height={27} width={40} />
            <Typography fontSize="14px" color={theme.palette.text.primary} noWrap component="div">
              Dashboard <b>Sistem Kepegawaian</b>
            </Typography>
          </Box>
          <Box
            onClick={(e) => setAnchor(e.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
          >
            <Image src={"/assets/icons/ic_person.png"} alt="Logo" height={32} width={32} />
            <Typography fontSize="13px" color={theme.palette.text.secondary}>
              {user.name}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ border: "1px solid #36597DBF" }} />
            <Typography fontSize="13px" fontWeight={600} color={theme.palette.text.primary}>
              {user.access}
            </Typography>
          </Box>
          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            disableAutoFocusItem
            disableScrollLock
            slotProps={{
              paper: {
                sx: {
                  py: 2,
                  mt: 1,
                  ml: 0.6,
                  minWidth: 250,
                  background: theme.palette.background.paper,
                  borderRadius: "12px",
                  border: `1px solid ${theme.palette.grey["200"]}`,
                  backdropFilter: "blur(20px)",
                  boxShadow: theme.shadows[1],
                },
              },
            }}
            MenuListProps={{ disablePadding: true }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  border: `1px solid ${theme.palette.text.primary}`,
                  background: theme.palette.grey["200"],
                  color: theme.palette.text.secondary,
                }}
              >
                {user.name[0]}
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.3,
                }}
              >
                <Typography fontSize="14px" fontWeight={600}>
                  {user.name}
                </Typography>
                <Typography fontSize="12px" color={theme.palette.text.secondary}>
                  {user.access}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ py: 2 }}>
              <Divider />
            </Box>
            {NavbarMenu.map((menu, index) => (
              <MenuItem key={index} onClick={() => handleClickMenu(menu.isHandle)} sx={{ py: 1 }}>
                <ListItemIcon sx={{ color: theme.palette.text.secondary }}>{<menu.icon />}</ListItemIcon>
                <ListItemText>
                  <Typography fontSize="13px" fontWeight={500}>
                    {menu.name}
                  </Typography>
                </ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <DrawerHeader />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 3.5,
          }}
        >
          {menu.map((menu, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <ListItemButton
                key={index}
                onClick={() => router.push(menu.path)}
                sx={[
                  {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 64,
                    width: 64,
                    background: currentPath === menu.path ? "#FFFFFF80" : "#36597D0D",
                    border: currentPath === menu.path ? "1px solid #FFFFFF" : "1px solid #36597D0D",
                    borderRadius: "24px",
                    "&:hover": {
                      background: "#FFFFFF80",
                      border: "1px solid #FFFFFF",
                    },
                  },
                ]}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <Image src={`/${menu.icon}`} alt="Icon" height={28} width={28} />
                </ListItemIcon>
              </ListItemButton>
              <Typography fontSize="10px" color={theme.palette.text.primary} sx={{ py: 1.25 }}>
                {menu.menu}
              </Typography>
            </Box>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, py: 3, pl: 15, pr: 3.5 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default BaseDrawer;
