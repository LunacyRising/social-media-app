import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { dislikePost } from "../../../actions/postsActions/dislikePostAction";
import { loginModalOpen } from "../../../actions/modalsActions/login";
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownTwoTone';
import { IconButton,Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const DislikeBtn = ({postId,dislikes}) => {

  const useStyles = makeStyles(() => ({

      btn: {
        width: 30,
        height: 30,
        marginRight: 5,
        marginLeft: 10
      },
      redDislike: {
          color: "#f44336"
      },
    }));
    const classes = useStyles();

    const { redDislike, btn } = classes;

    const { isAuthenticated } = useSelector(state => state.authReducer);

    const { t } = useTranslation();

    const dispatch = useDispatch(); 

    const dislike = () => {
      isAuthenticated ? dispatch(dislikePost({ postId })): dispatch(loginModalOpen());
    };

    return (
        <>
            <Tooltip title={t("Dislike")}>
                <IconButton className={ dislikes >= 1 ? `${redDislike} ${btn}`: btn} onClick={() => dislike()}>
                  <ThumbDownTwoToneIcon/>
                </IconButton>
              </Tooltip>
            <span className={dislikes && redDislike}>{dislikes}</span>
        </>
    );
};

export default DislikeBtn;