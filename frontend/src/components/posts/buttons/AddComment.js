import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {IconButton,Tooltip} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {loginModalOpen} from "../../../actions/modalsActions/login";
import AddCommentTwoToneIcon from '@material-ui/icons/AddCommentTwoTone';


const AddComment = ({ handleCommentModal }) => {

  const useStyles = makeStyles(() => ({

    btn: {
      width: 30,
      height: 30,
      marginRight: 5
    }
  })); 
  
  const classes = useStyles();

  const { btn } = classes;

  const {isAuthenticated} = useSelector(state => state.authReducer);

  const dispatch = useDispatch(); 

  return (
      <>
          <Tooltip title="Add a comment!">
              <IconButton className={btn} onClick={() => isAuthenticated ? handleCommentModal() : dispatch(loginModalOpen())}>
                <AddCommentTwoToneIcon />
              </IconButton>
          </Tooltip>
      </>
  );
};

export default AddComment;