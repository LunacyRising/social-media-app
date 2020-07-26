import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Menu,
  MenuItem,
  Box
} from "@material-ui/core";
import SortRoundedIcon from "@material-ui/icons/SortRounded";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../actions/postsActions/fetchPostsAction";


const SortPosts = () => {

  const useStyles = makeStyles(() => ({

    sortMenu: {
      position: "absolute",
      top: -50
    },
    noHover: {
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    sortBtns: {
      color: "white",
      backgroundColor: "#3b4248",
      borderRadius: 0,
      "&:hover": {
        backgroundColor: "3b4248",
        color: "#8b70d2"
      }
    },
    menuItem: {
      backgroundColor: "#3b4248"
    }
  }));
  const classes = useStyles();

  const {sortMenu, menuItem, noHover, sortBtns, } = classes;

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()

  const replacePosts = true

  const oldestOptions = {date: +1};

  const newestOptions = {date: -1};

  const mostLikeOptions = {likes: -1};

  const oldestSort = () => { 
    dispatch(fetchPosts(oldestOptions, replacePosts));
    handleClose();
  };

  const newestSort = () => {
    dispatch(fetchPosts(newestOptions, replacePosts));
    handleClose();
  };

  const mostLikes = () => {
    dispatch(fetchPosts(mostLikeOptions, replacePosts));
    handleClose();
  };

  return (
    <>
        <Box className={sortMenu}> 
          <Button color="primary" onClick={handleClick} className={noHover}>
              {t("SortBy")}
              <SortRoundedIcon fontSize="large" />
          </Button>
          <Menu
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "bottom", horizontal: "center" }}
              MenuListProps={{ style: { padding: 0 }}}
              open={anchorEl}
              onClose={handleClose}
              anchorEl={anchorEl}
              >
              <MenuItem className={menuItem}>
                  <Button className={sortBtns} onClick={() => mostLikes()}>
                      {t("MostFavorite")}
                  </Button>
              </MenuItem>
              <MenuItem className={menuItem}>
                  <Button className={sortBtns} onClick={() => newestSort()}>
                      {t("Newest")}
                  </Button>
                  </MenuItem>
              <MenuItem className={menuItem}>
                  <Button className={sortBtns} onClick={() => oldestSort()}>
                      {t("Oldest")}
                  </Button>
              </MenuItem>
          </Menu>
        </Box>
    </>
  );
};

export default SortPosts;
