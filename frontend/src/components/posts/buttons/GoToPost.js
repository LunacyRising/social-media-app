import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton,Tooltip } from "@material-ui/core";
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';


const GoToPost = ({ postId }) => {

  const useStyles = makeStyles(() => ({

    btn: {
      width: 30,
      height: 30,
      marginRight: 5
    }
  })); 
  
  const classes = useStyles();

  const { btn, icon } = classes;

  const { t } = useTranslation();

  return (
      <>
          <Tooltip title={t("GoToPost")}>
              <IconButton component={Link} to={`/posts/${postId}`} target="_blank" className={btn}>
                <ReplyRoundedIcon/>
              </IconButton>
          </Tooltip>
      </>
  );
};

export default GoToPost;