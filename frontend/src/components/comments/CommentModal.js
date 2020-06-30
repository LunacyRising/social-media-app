import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useCustomForm from "../auth/useCustomForm";
import {
  Box,
  TextField,
  Button, 
  Modal,
  Zoom,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createComment } from "../../actions/commentsActions/createComment";

const CommentModal = ({ postId, postCreator,title, amountOfComments, comentModalOpen, handleCommentModal }) => {

  const { loading } = useSelector(state => state.commentsReducer);

  const useStyles = makeStyles((theme) => ({

    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    modalContent: {
      width: 400,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    textArea: {
      width: "90%",
      margin: "auto",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 5,
      letterSpacing: 2
    },
    btn: {
      border: "solid 2px #8b70d2",
      width: "25%",
      marginTop: 20,
      backgroundColor: "white",
      cursor: loading && "not-allowed !important",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white"
      }
    }
  }));
  const classes = useStyles();

  const { modalContent, modal, textArea, btn } = classes;

  const dispatch = useDispatch();

  const formDefaultValues = { 
    comment: ""
  };

  const { values, handleChange } = useCustomForm(formDefaultValues)

  const { comment } = values

  const commentDispatch = () => {
    dispatch(createComment({ comment, postId, postCreator, title, amountOfComments }));
    handleCommentModal();
  };

  return (
    <>
        <Modal 
          className={modal}
          open={comentModalOpen}
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 500,
          }}
          onClose={handleCommentModal}
        >
          <Zoom in={comentModalOpen}>
            <Box className={modalContent}>
              <TextField
                className={textArea}
                multiline
                placeholder="Your Comment..."
                rows="4"
                variant="outlined"
                name="comment"
                value={comment}
                onChange={handleChange}
              />
              <Button
                onClick={() => commentDispatch()} 
                color="primary"
                className={btn}
              >
                Comment
                {loading && <CircularProgress size={10}/>} 
              </Button>
            </Box>
          </Zoom>
        </Modal>
    </>
  );
};

export default CommentModal;
