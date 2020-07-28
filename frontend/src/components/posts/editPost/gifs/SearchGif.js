import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton,Tooltip } from "@material-ui/core";
import GifOutlinedIcon from '@material-ui/icons/GifOutlined';

const SearchGif = ({ setGifstMenuOpen }) => {

  const useStyles = makeStyles(() => ({

    btn: {
      width: 50,
      height: 50
    }
  })); 
  
  const classes = useStyles();

  const { btn } = classes;

  const { isAuthenticated } = useSelector(state => state.authReducer);

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  return (
      <>
          <Tooltip title="search gif">
              <IconButton className={btn} onClick={() => setGifstMenuOpen(true)}>
                <GifOutlinedIcon fontSize="large"/>
              </IconButton>
          </Tooltip>
      </>
  );
};

export default SearchGif;