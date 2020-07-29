import React, { useRef, useCallback, useState, useEffect } from "react";
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
  CircularProgress,
  LinearProgress
} from "@material-ui/core";
import ReactQuill from 'react-quill';
import UploadImageBtn from "../mediaBtns/UploadImageBtn"; 
import SearchGif from "../mediaBtns/SearchGif";
import GifsMenu from "../GifsMenu";
import SearchEmoji from "./emojis/SearchEmoji";
import EmojisMenu from "./emojis/EmojisMenu";
import { editPost } from "../../../actions/postsActions/editPostAction";
import { insertMedia } from "../../../helperFunctions/insertMedia";
import { formData } from "../../../helperFunctions/formData";


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

  const { modalContent, modal, mediaBtnsContainer, btn } = classes;

  const [ gifstMenuOpen, setGifstMenuOpen ] = useState(false);

  const [ emojisMenuOpen, setEmojisMenuOpen ] = useState(false);

  const [ previewLoading, setPreviewLoading ] = useState(false);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const quillRef = useRef();

  const formDefaultValues = {  
    post: postToEdit
  };

  useEffect(() => {
    setValues({...values, post: postToEdit})
  },[postToEdit])

  const { values, setValues, handleChangeQuill } = useCustomForm(formDefaultValues)

  const { post } = values

  const qre = useCallback(item => {
    quillRef.current = {...item};
    const quill =  item && item.getEditor();
    quill && quill.focus(); 
    const mediaExists = quill && item.getEditor().getContents().ops.length;
    console.log( item && item.getEditor().getContents())
    if(item && media && mediaExists === 1){
      insertMedia(item, media, mediaAlt)
    }
    quill && quill.setSelection(300002);
  },[])

  const editPostDispatch = () => {
    console.log(values)
    const data = formData(values)
    dispatch(editPost(data, postId));
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
            defaultValue={post}
            theme="bubble"
            placeholder="edit post"
            />
            {gifstMenuOpen && <GifsMenu editPostComponent setGifstMenuOpen={setGifstMenuOpen} values={values} setValues={setValues} quillRef={quillRef}/>}
            {emojisMenuOpen && <EmojisMenu setEmojisMenuOpen={setEmojisMenuOpen} quillRef={quillRef}/>}
            {previewLoading && <LinearProgress style={{width: "100%"}}/>}
            <Box className={mediaBtnsContainer}>
              <UploadImageBtn quillRef={quillRef} setPreviewLoading={setPreviewLoading} values={values} setValues={setValues}/>
              <SearchGif quillRef={quillRef} setGifstMenuOpen={setGifstMenuOpen}/>
              <SearchEmoji quillRef={quillRef} setEmojisMenuOpen={setEmojisMenuOpen}/>
            </Box>
            <Button
              onClick={() => editPostDispatch()}
              color="primary"
              className={btn}
            >
              {t("Edit")}
              {loading && <CircularProgress size={10} />} 
            </Button>
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default EditPostModal;
