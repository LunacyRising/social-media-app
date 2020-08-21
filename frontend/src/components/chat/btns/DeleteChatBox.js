import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton,Tooltip } from "@material-ui/core";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { deleteChat } from "../../../actions/chatActions/deleteChat";

const DeleteChatBox = ({ id }) => {

  const useStyles = makeStyles((theme) => ({

    btn: {
        width: 20,
        height: 20,
        transition: "0.3s ease-in-out"
    },
    icon: {
        fontSize: 20
    }
  })); 
  
  const classes = useStyles();

  const { btn, icon } = classes;

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  const removeChatBox = () => {
    dispatch(deleteChat(id))
  }

  return (
      <>
          <Tooltip title="delete chat box">
              <IconButton className={btn} onClick={removeChatBox}>
                <HighlightOffRoundedIcon className={icon}/>
              </IconButton>
          </Tooltip>
      </>
  );
};

export default DeleteChatBox;