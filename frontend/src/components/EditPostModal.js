import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Modal,
  Backdrop,
  Box,
  CircularProgress
} from "@material-ui/core";
import { editPost } from "../actions/postsActions/editPostAction";

const EditPostModal = ({ openEditPostModal, editPostModal, postToEdit, postId }) => { 

 
  const { loading } = useSelector(state => state.commentsReducer);

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
        borderRadius: 5
      },
      buttons: {
        border: "solid 2px #8b70d2",
        position: "absolute",
        right: 125,
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

  const { paper, modal, textArea, buttons, disable, spinner } = classes;

  const dispatch = useDispatch();
  const editPostDispatch = () => {
    dispatch(editPost({ editedPost, postId }))
    editPostModal(); 
  }

  const [editedPost, setEditedPost] = useState(postToEdit);

  const handleChange = e => {
    e.preventDefault();
    setEditedPost(e.target.value);
  };

  return (
    <>
      <Box>
        <Modal
          className={modal}
          open={openEditPostModal}
          onClose={editPostModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Box className={paper}>
            <TextField
              className={textArea}
              multiline
              rows="4"
              variant="outlined"
              name="post"
              value={editedPost}
              onChange={handleChange}
            />
            <Button
              onClick={() => editPostDispatch()}
              color="primary"
              className={loading ? `${buttons}${disable}` : buttons}
            >
              Edit
              {loading && <CircularProgress className={spinner} size={15} />}
            </Button>
          </Box>
        </Modal>
      </Box>
       
    </>
  );
};

export default EditPostModal;
