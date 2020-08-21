import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton,Tooltip } from "@material-ui/core";
import GifOutlinedIcon from '@material-ui/icons/GifOutlined';

const SearchGif = ({ chatBoxComponent, setGifstMenuOpen }) => {

  const useStyles = makeStyles((theme) => ({

    btn: {
      width: !chatBoxComponent ? 34 : 25,
      height: !chatBoxComponent ? 34 : 25,
      marginRight: chatBoxComponent && 10,
      transition: "0.3s ease-in-out",
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: "transparent"
      }
    },
    icon: {
      fontSize: !chatBoxComponent ? 34 : 25,
    }
  })); 
  
  const classes = useStyles();

  const { btn, icon } = classes;

  const { isAuthenticated } = useSelector(state => state.authReducer);

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  return (
      <>
          <Tooltip title="search gif">
              <IconButton className={btn} onClick={() => setGifstMenuOpen(true)}>
                <GifOutlinedIcon className={icon}/>
              </IconButton>
          </Tooltip>
      </>
  );
};

export default SearchGif;