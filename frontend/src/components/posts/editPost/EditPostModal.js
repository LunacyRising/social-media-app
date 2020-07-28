import React, { useRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useCustomForm from "../../auth/useCustomForm";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Modal,
  Zoom,
  Backdrop,
  Box,
  CircularProgress
} from "@material-ui/core";
import ReactQuill from 'react-quill';
import UploadImageBtn from "./images/UploadImageBtn";
import SearchGif from "./gifs/SearchGif";
import GifsMenu from "./gifs/GifsMenu";
import SearchEmoji from "./emojis/SearchEmoji";
import { editPost } from "../../../actions/postsActions/editPostAction";
import { insertMedia } from "../../../helperFunctions/insertMedia";
import { removeHtmlTag } from "../../../helperFunctions/removeHtmlTag";


const EditPostModal = ({ postToEdit, media, mediaAlt, postId, openEditPostModal, editPostModal }) => {   

  const { loading } = useSelector(state => state.commentsReducer);

  const useStyles = makeStyles((theme) => ({

      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      modalContent: {
        width: "80%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        "@media(min-width: 768px)" : {
          width: "50%"
         }
      },
      textArea: {
        width: "100%",
        margin: "auto",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5
      },
      mediaBtnsContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
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

  const { modalContent, modal, textArea, mediaBtnsContainer, btn } = classes;

  const [ gifstMenuOpen, setGifstMenuOpen ] = useState(false);

  const [ emojisMenuOpen, setEmojisMenuOpen ] = useState(false);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const quillRef = useRef();

  const formDefaultValues = {  
    editedPost: postToEdit
  };

  const { values, setValues, handleChangeQuill } = useCustomForm(formDefaultValues)


  const { editedPost, newMedia, newMediaAlt } = values

  const qre = useCallback(item => {
    const quill =  item && item.getEditor();
    const range = quill && item.getEditor().getContents().ops.length;
    console.log( item && item.getEditor().getContents())
    if(item && media && range === 1){
      insertMedia(item, media, mediaAlt)
      quillRef.current = {...item}
    }
  },[])

  const editPostDispatch = () => {
    console.log(values)
    const data = new FormData();
    data.append("post", removeHtmlTag(editedPost));
    newMedia && data.append("media", newMedia);
    newMediaAlt && data.append("mediaAlt", newMediaAlt);
    dispatch(editPost(data, postId));
    const quill = quillRef.current.getEditor();
    quill.setContents([{ insert: '\n' }]);
    console.log("quill", quill)
    editPostModal(); 
  }

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
            <ReactQuill
            ref={qre} 
            onChange={handleChangeQuill}
            defaultValue={editedPost}
            theme="bubble"
            placeholder="edit post"
            />
            {gifstMenuOpen && <GifsMenu setGifstMenuOpen={setGifstMenuOpen} values={values} setValues={setValues} quillRef={quillRef}/>}
            <Box className={mediaBtnsContainer}>
              <UploadImageBtn quillRef={quillRef}/>
              <SearchGif quillRef={quillRef} setGifstMenuOpen={setGifstMenuOpen}/>
              <SearchEmoji  quillRef={quillRef}/>
            </Box>
            <Button
              onClick={() => editPostDispatch()}
              color="primary"
              className={btn}
            >
              {t("Edit")}
              {loading && <CircularProgress size={10} />} 
            </Button>*/
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default EditPostModal;
