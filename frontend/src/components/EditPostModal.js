import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Modal,
  Zoom,
  Backdrop,
  Box,
  CircularProgress
} from "@material-ui/core";
import { editPost } from "../actions/postsActions/editPostAction";

const EditPostModal = ({ postToEdit, postId, openEditPostModal, editPostModal }) => {   

 
  const { loading } = useSelector(state => state.commentsReducer);

  const useStyles = makeStyles((theme) => ({

      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      modalContent: {
        width: "50%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      },
      textArea: {
        width: "100%",
        margin: "auto",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5
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
        },
    }
  }));
  const classes = useStyles();

  const { modalContent, modal, textArea, btn } = classes;

  const dispatch = useDispatch();

  const editPostDispatch = () => {
    dispatch(editPost({ editedPost, postId }));
    editPostModal();
    setEditedPost("")
  }

  const [editedPost, setEditedPost] = useState(postToEdit);

  const handleChange = e => {
    e.preventDefault(); 
    setEditedPost(e.target.value);
  };

  return (
    <>
      <Modal
        className={modal}
        open={openEditPostModal}
        onClose={() => editPostModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Zoom in={openEditPostModal}>
          <Box className={modalContent}>
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
              className={btn}
            >
              Edit
              {loading && <CircularProgress size={10} />}
            </Button>
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default EditPostModal;
