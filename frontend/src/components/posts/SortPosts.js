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
import { fetchOldestPosts } from "../../actions/postsActions/fetchOldestPostsAction";
import { fetchPostMostLikes } from "../../actions/postsActions/fetchPostMostLikesAction";


const SortPosts = () => {

  const useStyles = makeStyles(() => ({
    sortMenu: {
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
    menu: {
      backgroundColor: "#3b4248"
    }
  }));
  const classes = useStyles();

  const { menu, sortMenu, sortBtns, } = classes;

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()

  const oldestSort = () => { 
    dispatch(fetchOldestPosts());
    handleClose();
  };

  const newestSort = () => {
    dispatch(fetchPosts());
    handleClose();
  };

  const mostLikes = () => {
    dispatch(fetchPostMostLikes());
    handleClose();
  };

  return (
    <>
        <Box className={sortMenu}> 
          <Button color="primary" onClick={handleClick} className={sortMenu}>
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
              <MenuItem className={menu}>
                  <Button className={sortBtns} onClick={() => mostLikes()}>
                      {t("MostFavorite")}
                  </Button>
              </MenuItem>
              <MenuItem className={menu}>
                  <Button className={sortBtns} onClick={() => newestSort()}>
                      {t("Newest")}
                  </Button>
                  </MenuItem>
              <MenuItem className={menu}>
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
