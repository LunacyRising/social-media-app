import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, Button } from "@material-ui/core";
import  { createReply }  from "../../actions/commentsActions/createReply";

const ReplyField = ({ postId, setReplyFieldOpen, commentId, replies}) => {

  const useStyles = makeStyles(() => ({

    container: {
      display:"flex",
      flexDirection: "column"
    },
    btnsContainer: {
        display: "flex",
        justifyContent: "flex-end" 
    },
    btns: {
      fontSize: 12
    }
  })); 

  const classes = useStyles();

  const { container, btnsContainer, btns } = classes;

  const { isAuthenticated } = useSelector(state => state.authReducer);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  
  const [ reply, setReply ] = useState("")

  const dispatchReply = () => {
    dispatch(createReply({ postId, commentId, comment: reply, replies})) 
    setReply("")
    setReplyFieldOpen(false)
  }

  return (
      <>    
        <Box className={container}>
          <TextField onChange={(e) => setReply(e.target.value)} type="text" name="reply" value={reply}/>
          <Box className={btnsContainer}>
            <Button className={btns} onClick={() => dispatchReply()}>{t("Accept")}</Button>
            <Button className={btns} onClick={() => setReplyFieldOpen(false)}>{t("Cancel")}</Button>
          </Box>
        </Box>
      </>
  );
};

export default ReplyField;