import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Router from "next/router";
import DevicesIcon from "@mui/icons-material/Devices";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import InsightsIcon from "@mui/icons-material/Insights";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InstagramIcon from "@mui/icons-material/Instagram";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../auth/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useRouter } from "next/router";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: "20px",
    // width: `calc(100% - ${drawerWidth}px)`,// To overlap headerS
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ userRole, children }) {
  return (
    <>
      {/* <Box sx={{ display: "flex", backgroundColor: "white" }}> */}
      <div style={{marginLeft:"80px",backgroundColor: "white",marginRight:"none"}}>

        <CssBaseline />
        <NavBar userRole={userRole} />
        <SideDrawer userRole={userRole} />
        <Box
          sx={{
            width: "98%",
            overflow: "hidden",
            marginTop: "60px",
            backgroundColor: "white",
          }}
        >
          {children}
        </Box>
            </div>
      {/* </Box> */}
    </>
  );
}

function NavBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <AppBar
        sx={{
          boxShadow: "1px 4px 5px 3px #888888",
          backgroundColor: "#556cd6",
          color: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          "@media only screen  and (max-width: 730px)": {
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            display: "flex",
            "@media only screen  and (max-width: 730px)": {
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          <Typography
            sx={{
              cursor: "pointer",
              fontFamily: "Poppins",
              marginRight: "75px",
              "@media only screen  and (max-width: 730px)": {
                margin: "15px",
              },
            }}
            variant="h6"
            noWrap
            component="div"
          >
            EPVI Technologies
          </Typography>
          <Toolbar
            sx={{
              "@media only screen  and (max-width: 730px)": {
                display: "flex",
                flexDirection: "row",
                margin: "10px",
              },
            }}
          >
            {/* <TextField
              sx={{
                fontFamily: "Poppins",
                width: "25vw",
                "@media only screen  and (max-width: 730px)": {
                  width: "70vw",
                },
              }}
              id="outlined-basic"
              label="Search"
              variant="outlined"
            /> */}
            {/* <SearchIcon
              sx={{
                cursor: "pointer",
                marginLeft: "10px",
                fontSize: "35px",
                "@media only screen  and (max-width: 730px)": {
                  margin: "10px",
                },
              }}
            /> */}
          </Toolbar>
        </Toolbar>
        <Toolbar>
          <Avatar
            sx={{
              cursor: "pointer",
              marginRight: "15px",
              "@media only screen  and (max-width: 730px)": {
                margin: "auto",
              },
            }}
            src="/broken-image.jpg"
          />
          <NotificationsIcon
            sx={{
              cursor: "pointer",
              marginRight: "15px",
              fontSize: "35px",
              "@media only screen  and (max-width: 730px)": {
                margin: "auto",
              },
            }}
          />
          <MoreHorizIcon
            sx={{
              cursor: "pointer",
              fontSize: "35px",
              "@media only screen  and (max-width: 730px)": {
                margin: "auto",
              },
            }}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}

function SideDrawer({ userRole }) {
  const theme = useTheme();
  // const state = useCount();
  const { logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOnClick = () => {
    // logs the user out and redirects to home page
    logout();
    Router.push("/login");
    return <p>Logging out...</p>;
  };
  const { asPath, pathname } = useRouter();
  // console.log(pathname)
  const handleClickOne = (index) => {
    if (index === 0) Router.push("/");
    if (index === 1) Router.push("/customercomplaint");
    if (index === 2) Router.push("/devices");
  };
  const handleClickTwo = (index) => {
    if (index === 0) Router.push("/users");
    if (index === 1) Router.push("/sub");
    if (index === 2) Router.push("/customerdata/information");
  };
  const styling = {
    color: "#556cd6",
  };
  // console.log(window.location.href)
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            marginTop: "60px",
            "@media only screen  and (max-width: 730px)": {
              marginTop: "32vh",
            },
          }}
        >

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
              marginRight: "5px",
              color: "black",
              "@media only screen  and (max-width: 730px)": {
                marginRight: "0",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            sx={open ? { display: "block" } : { display: "none" }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "ltl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ backgroundColor: "white" }}>
          {["Dashboard", "Customer Complaint", "Devices"].map((text, index) =>
            userRole === "admin" || userRole === "support" ? (
              <ListItem
                onClick={() => handleClickOne(index)}
                key={text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 ? (
                      <DashboardIcon sx={pathname === "/" ? styling : null} />
                    ) : null}
                    {index === 1 ? (
                      <InboxIcon
                        sx={pathname === "/customercomplaint" ? styling : null}
                      />
                    ) : null}
                    {index === 2 ? (
                      <DevicesIcon
                        sx={pathname === "/devices" ? styling : null}
                      />
                    ) : null}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ) : null
          )}
          {/* {["Insights", "Sales", "Advertisement", "Reach"].map((text, index) =>
            userRole === "admin" || userRole === "marketing" ? (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 ? <InsightsIcon /> : null}
                    {index === 1 ? <MonetizationOnIcon /> : null}
                    {index === 2 ? <AddPhotoAlternateIcon /> : null}
                    {index === 3 ? <InstagramIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ) : null */}
          {/* )} */}
          {["Users", "MqttData", "Customer Data"].map((text, index) =>
            userRole === "admin" || userRole === "developer" ? (
              <ListItem
                onClick={() => handleClickTwo(index)}
                key={text}
                disablePadding
                sx={{ display: "block" }}
                >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 ? (
                      <ContactPageIcon
                        sx={pathname === "/users" ? styling : null}
                      />
                    ) : null}
                    {index === 1 ? (
                      <SettingsApplicationsIcon
                        sx={pathname === "/sub" ? styling : null}
                      />
                    ) : null}
                    {index === 2 ? (
                      <IntegrationInstructionsIcon
                        sx={
                          pathname === "/customerdata/information" ||
                          pathname === "/customerdata/premise" ||
                          pathname === "/customerdata/raiseticket" ||
                          pathname === "/customerdata/service" ||
                          pathname === "/customerdata/tracking"
                            ? styling
                            : null
                          }
                      />
                    ) : null}
                    {/* {index === 3 ? <AdminPanelSettingsIcon /> : null} */}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ) : null
          )}
          {["Logout"].map((text, index) => (
            <ListItem
              onClick={handleOnClick}
              key={text}
              disablePadding
              sx={{ display: "block" }}
              >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <DrawerHeader />
       
    </>
  );
}
