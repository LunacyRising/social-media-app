import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton,Tooltip } from "@material-ui/core";
import AddCommentTwoToneIcon from '@material-ui/icons/AddCommentTwoTone';
import { loginModalOpen } from "../../../actions/modalsActions/login";

const AddComment = ({ handleCommentModal  }) => {

  const useStyles = makeStyles(() => ({

    btn: {
      width: 30,
      height: 30,
      marginRight: 5
    }
  })); 
  
  const classes = useStyles();

  const { btn } = classes;

  const { isAuthenticated } = useSelector(state => state.authReducer);

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  return (
      <>
          <Tooltip title={t("AddComment")}>
              <IconButton className={btn} onClick={() => isAuthenticated ? handleCommentModal()  : dispatch(loginModalOpen())}>
                <AddCommentTwoToneIcon />
              </IconButton>
          </Tooltip>
      </>
  );
};

export default AddComment;