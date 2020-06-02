import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Menu, MenuItem, Fade, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";
import Notifications from "../notifications/Notifications"

const NavbarDropdown = ({ role, userName, logout }) => {

  const useStyles = makeStyles(() => ({
    btn: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
      transition: ".2s ease all",
      marginRight: 10,
      "&:hover": {
        textDecoration: "none",
        color: "#8b70d2",
        backgroundColor: "transparent"
      }
    },
    popUpMarginTop: {
      marginTop: 50
    },
    userAvatar: {
      width: 25,
      height: 25
    }
  }));

  const classes = useStyles();
  const { btn, popUpMarginTop, userAvatar } = classes;
  //////////////////////////////////////////////////////////////////////
  const { avatar} = useSelector(state => state.authReducer);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminLinks = (
    <div> 
      <MenuItem onClick={handleClose}>
        <Link to="/admin">Admin Panel</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/admin/users">Edit Users</Link>
      </MenuItem>
    </div>
  );
  /////////////////////////////////////////////////////////////////
  return (
    <>
        <Avatar className={userAvatar} alt="avatar" src={avatar}/>
        <Button
          className={btn}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {userName}
          <ArrowDropDownIcon />
        </Button>
        <Notifications/>
        <Menu
          className={popUpMarginTop}
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link  to="/editProfile">Edit Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/favorites">Favorites</Link>
          </MenuItem>
          {role === "admin" && adminLinks}
          <MenuItem onClick={handleClose}>
            <Link onClick={logout} > 
              LogOut
            </Link>
          </MenuItem>
        </Menu>
    </>
  );
};

export default NavbarDropdown;
