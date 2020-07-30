import React, { useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useCustomForm from "./auth/useCustomForm";
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
import UploadImageBtn from "./posts/mediaBtns/UploadImageBtn"; 
import SearchGif from "./posts/mediaBtns/SearchGif";
import GifsMenu from "./posts/GifsMenu";
import SearchEmoji from "./posts/emojis/SearchEmoji";
import EmojisMenu from "./posts/emojis/EmojisMenu";
import { insertMedia } from "../helperFunctions/insertMedia";
import { formData } from "../helperFunctions/formData";


const QuillModal = ({ editPostComponent, extraInfo, number, id, openModal, btnText, closeModal, loading, action }) => {  
    
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
        //cursor: loading && "not-allowed !important",
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
    ...extraInfo
  };

  const { values, setValues, handleChangeQuill } = useCustomForm(formDefaultValues)

  const { text, media, mediaAlt } = values;

  const qre = useCallback(item => {
    quillRef.current = {...item}
    if(editPostComponent){
      const quill =  item && item.getEditor();
      quill && quill.focus(); 
      const mediaExists = quill && item.getEditor().getContents().ops.length;
      if(item && media && mediaExists === 1){
        insertMedia(item, media, mediaAlt)
      }
    quill && quill.setSelection(300002); 
    }
  },[media])

  const dispatchAction = () => {
    const data = formData(values)
    dispatch(action(data, id, number));
    closeModal();
    quillRef.current.getEditor().setContents([{ insert: '\n' }]); 
  }

  return (
    <>
      <Modal
        className={modal}
        open={openModal}
        onClose={() => closeModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Zoom in={openModal}>
          <Box className={modalContent}>
            <ReactQuill
            ref={qre} 
            onChange={handleChangeQuill}
            defaultValue={text}
            theme="bubble"
            placeholder="despues lo tradusco"
            />
            {gifstMenuOpen && <GifsMenu quillModal setGifstMenuOpen={setGifstMenuOpen} values={values} setValues={setValues} quillRef={quillRef}/>}
            {emojisMenuOpen && <EmojisMenu setEmojisMenuOpen={setEmojisMenuOpen} quillRef={quillRef}/>}
            {previewLoading && <LinearProgress style={{width: "100%"}}/>}
            <Box className={mediaBtnsContainer}>
              <UploadImageBtn quillRef={quillRef} setPreviewLoading={setPreviewLoading} values={values} setValues={setValues}/>
              <SearchGif quillRef={quillRef} setGifstMenuOpen={setGifstMenuOpen}/>
              <SearchEmoji quillRef={quillRef} setEmojisMenuOpen={setEmojisMenuOpen}/>
            </Box>
            <Button
              onClick={() => dispatchAction()}
              color="primary"
              className={btn}
            >
              {btnText}
              {/*loading && <CircularProgress size={10} />*/} 
            </Button>
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default QuillModal;
