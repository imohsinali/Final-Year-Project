import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LandscapeIcon from "@mui/icons-material/Landscape";
import { Link } from "react-router-dom";
const list = [
  {
    id: 0,
    icon: <DashboardIcon />,
    text: "Dashboard",
    path: "/user-dashboard",
  },
  {
    id: 1,

    icon: <AddPhotoAlternateIcon />,
    text: "Land Gallery",
    path: "/landgallery",
  },

  {
    id: 2,

    icon: <LandscapeIcon />,
    text: "My Land",
    path: "/myLand",
  },
  


  {
    id: 3,

    icon: <AddPhotoAlternateIcon />,
    text: "Add Land",
    path: "/addland",
  },
  {
    id: 4,

    icon: <PeopleIcon />,
    text: "profile",
    path: "/profile",
  },
  {
    id: 5,

    icon: <LogoutIcon />,
    text: "logout",
    path: "/",
  },
];

const Menu = ({ open }) => {
  return (
    <List component="nav">
      {list.map((item) => {
        const { icon, text, id, path } = item;
        return (
          <Link
            to={path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ListItem
              key={id}
              // onClick={id == 5 ? logout : ""}
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
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Link>
        );
      })}

      <Divider sx={{ my: 1 }} />
    </List>
  );
};

export default Menu;
