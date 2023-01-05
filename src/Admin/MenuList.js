import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import People from "@mui/icons-material/People";
const logout = () => {
  localStorage.clear();
};
const list = [
  {
    id: 0,
    icon: <DashboardIcon />,
    text: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 1,

    icon: <PersonAddAlt1Icon />,
    text: "Add Land Inspector",
    path: "/addlandinspector",
  },

  {
    id: 2,

    icon:<People/>,
    text: "All Land Inspector",
    path: "/alllandinspector",
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
              key={icon}
              // onClick={id == 4 ? logout : ""}
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
