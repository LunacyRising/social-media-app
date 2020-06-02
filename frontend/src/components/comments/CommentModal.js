import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../actions/commentsActions/createComment";
import {
  TextField,
  Button, 
  Modal,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const CommentModal = ({ comentModalOpen, handleCommentModal, postId, postCreator,title,amountOfComments,setCommentsNumber}) => {

  const { darkMode } = useSelector(state => state.darkModeReducer);
  
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      width: 400,
      animation: "expand .3s ease", 
      display: "flex",
      flexDirection: "column",
      position: "relative"
    },
    textArea: {
      width: "90%",
      margin: "auto",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 5,
      letterSpacing: 2
    },
    buttons: {
      border: "solid 2px #8b70d2",
      position: "absolute",
      right: 111,
      bottom: -50,
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white"
      },
      disable: {
        opacity: 0.5,
        cursor: "not-allowed !important"
      },
      spinner: {
        marginRight: 5 
      }
    }
  }));
  const classes = useStyles();
  const { paper, modal, textArea, buttons, disable, spinner} = classes;
  /////////////////////////////////////////////////////////
  const commentsReducer = useSelector(state => state.commentsReducer);
  const { loading } = commentsReducer;
  ///////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  ///////////////////////////////////////////////////////////
  const [comment, setComment] = useState(""); 
  ///////////////////////////////////////////////////////////
  const handleChange = e => {
    e.preventDefault();
    setComment(e.target.value);
  };
  ///////////////////////////////////////////////////////////////
  const commentDispatch = () => {
    dispatch(createComment({comment, postId, postCreator,title}));
    setCommentsNumber(amountOfComments +1);
    console.log(amountOfComments)
    handleCommentModal();
  };
  ///////////////////////////////////////////////////////////
  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={modal}
          open={comentModalOpen}
          onClose={handleCommentModal}
        >
          <div className={paper}>
            <TextField
              className={textArea}
              multiline
              placeholder="Your Comment..."
              rows="4"
              variant="outlined"
              name="post"
              value={comment}
              onChange={handleChange}
            />
            <Button
              onClick={() => commentDispatch()} 
              color="primary"
              className={loading ? `${buttons}${disable}` : buttons}
            >
              Comment
              {loading && <CircularProgress className={spinner} size={15} />}
            </Button>
          </div>
        </Modal>
      </div>
       
    </>
  );
};

export default CommentModal;
