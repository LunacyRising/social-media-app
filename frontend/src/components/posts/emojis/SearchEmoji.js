import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton,Tooltip } from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';

const SearchEmoji = ({ chatBoxComponent, setEmojisMenuOpen }) => {

  const useStyles = makeStyles((theme) => ({

    btn: {
      width: !chatBoxComponent ? 34 : 25,
      height: !chatBoxComponent ? 34 : 25,
      transition: "0.3s ease-in-out",
      "&:hover": {
        color: theme.palette.primary.main
      },
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
          <Tooltip title="search emoji">
              <IconButton className={btn} onClick={() => setEmojisMenuOpen(true)}>
                <EmojiEmotionsOutlinedIcon className={icon}/>
              </IconButton>
          </Tooltip>
      </>
  );
};

export default SearchEmoji;