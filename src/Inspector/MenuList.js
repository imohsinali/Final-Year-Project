import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TerrainIcon from '@mui/icons-material/Terrain';
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
const logout = () => {
  localStorage.clear();
};
const list = [
  {
    id: 0,
    icon: <DashboardIcon />,
    text: "Dashboard",
    path: "/Inspector-dashboard",
  },
  {
    id: 1,

    icon: <VerifiedUser />,
    text: "Verifiy User",
    path: "/verifyuser",
  },

  {
    id: 2,

    icon:<TerrainIcon/>,
    text: "Verify Land",
    path: "/verifyland",
  },
  {
    id: 3,

    icon: <PublishedWithChangesIcon />,
    text: "Transfer Ownership",
    path: "/transferownership",
  },
  {
    id: 4,

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
              onClick={id == 4 ? logout : ""}
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
