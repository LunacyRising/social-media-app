import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCustomForm from "../auth/useCustomForm";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Box, LinearProgress} from "@material-ui/core";
import UploadImageBtn from "../posts/mediaBtns/UploadImageBtn";
import SearchEmoji from "../posts/mediaBtns/SearchEmoji";
import SearchGif from "../posts/mediaBtns/SearchGif";
import GifsMenu from "./GifsMenu";
import { createPost } from "../../actions/postsActions/createPostAction";
import { loginModalOpen } from "../../actions/modalsActions/login";
import QuillEditor from "./editor/QuillEditor";

const PostTextArea = () => {

  const { isAuthenticated, avatar, userId, amountOfPosts, userName } = useSelector(state => state.authReducer);

  const creatorAmountOfPosts = amountOfPosts

  const { darkMode } = useSelector(state => state.darkModeReducer);

  const useStyles = makeStyles((theme) => ({
    TextAreaContainer: {
      position: "relative",
      margin: "20vh auto 20px",
      width: 400,
      animation: "drop2 1.8s ease-in",
      display: "flex",
      flexDirection: "column",
      "@media(min-width: 320px) and (max-width: 480px)" : {
       width: "100%"
      }
    },
    previewStyle: {
      position: "absolute", 
      left: "50%",
      top: 120,
      transform: "translateX(-50%)" 
    },
    textFieldAndPreview: {
     display: "flex",
     flexDirection: "row"
    },
    submitBtn: {
      width: "50%",
      margin: "35px auto",
      color: !darkMode ? theme.palette.primary.main : "white",
      border: !darkMode ? `solid 2px ${theme.palette.primary.main}` : "solid 2px white",
      backgroundColor:  theme.palette.background.paper,
      '&:hover': {
        backgroundColor: !darkMode ? "#f8eeff" : "#191919",
      }
    },
    mediaBtnsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 40
    },
    titleArea: {
      width: "100%",
      backgroundColor: darkMode ? "#424242" : "white",
      borderRadius: 4
    }
  }));
  const classes = useStyles();

  const { TextAreaContainer, textFieldAndPreview, submitBtn, mediaBtnsContainer, titleArea } = classes; 

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const reactQuillRef = useRef()

  const [ previewLoading, setPreviewLoading ] = useState(false)

  const formDefaultValues = {
    title: "",
    post: ""
  };

  const { values, setValues, handleChange } = useCustomForm(formDefaultValues);

  const { title, post, media, mediaAlt } = values;

  const [ gifstMenuOpen, setGifstMenuOpen ] = useState(false)

  const createNewPost = () => {
    const data = new FormData(); 
    data.append("title", title);
    data.append("post", post);
    data.append("avatar", avatar);
    data.append("creatorAmountOfPosts", creatorAmountOfPosts);
    data.append("userId", userId);
    data.append("userName", userName);
    media && data.append("media", media);
    mediaAlt && data.append("mediaAlt", mediaAlt);
    dispatch(createPost(data)); 
  }

  const handleChangePost = (e) => {
    setValues({...values, post: e})
    console.log(values)
  }

  const submit = () => {
    isAuthenticated ? createNewPost() : dispatch(loginModalOpen());
    setValues({title: "", post : ""})
  };

  return (
    <>
      <Box className={TextAreaContainer}>
        <TextField
            className={titleArea}
            placeholder={t("Title")}
            variant="outlined"
            name="title"
            value={title}
            onChange={handleChange} 
          />
          
            <QuillEditor referencia={reactQuillRef} handleChangePost={handleChangePost} value={post}/>  
          
          {previewLoading && <LinearProgress style={{width: "100%"}}/>}
          {gifstMenuOpen && <GifsMenu setGifstMenuOpen={setGifstMenuOpen} values={values} setValues={setValues} referencia={reactQuillRef}/>}
          <Box className={mediaBtnsContainer}>
            <UploadImageBtn values={values} setValues={setValues} referencia={reactQuillRef} setPreviewLoading={setPreviewLoading}/>
            <SearchGif setGifstMenuOpen={setGifstMenuOpen}/>
            <SearchEmoji/>
          </Box>
          <Button color="primary" className={submitBtn} onClick={() => submit()}>
            {t("PostIt")}
          </Button>
      </Box>
    </>
  );
  
};


export default PostTextArea;
