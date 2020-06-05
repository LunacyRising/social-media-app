import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { createPost } from "../../actions/postsActions/createPostAction";
import { loginModalOpen } from "../../actions/modalsActions/login";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const PostTextArea = () => {

  const { isAuthenticated } = useSelector(state => state.authReducer);

  const { darkMode } = useSelector(state => state.darkModeReducer);

  const useStyles = makeStyles(() => ({
    TextAreaContainer: {
      position: "relative",
      margin: "20vh auto",
      width: 400,
      animation: "drop2 1.8s ease-in",
      display: "flex",
      flexDirection: "column",
      "@media(min-width: 320px) and (max-width: 480px)" : {
        margin: "20vh auto",
       width: "100%"
      }
    },
    buttons: {
     width: "50%",
     margin: "15px auto",
      border:  darkMode ? "solid 2px #8b70d2" : "solid 2px #8b70d2",
      backgroundColor: darkMode ? "#424242" : "white", 
      "&:hover": {
        backgroundColor: darkMode ? "#3b4248 !important" : "#8b70d2",
        color: "white",
        border: "solid 2px #5d6972",
        borderColor: darkMode && "white"
      }
    },
    textArea: {
      marginTop: 10,
      backgroundColor: darkMode ? "#424242" : "white" 
    },
  }));
  const classes = useStyles();

  const { TextAreaContainer, buttons, textArea } = classes; 

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const formDefaultValues = {
    title: "",
    post: ""
  };

  const [formValues, setFormValues] = useState(formDefaultValues);

  const { title, post } = formValues;

  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState, 
      [target.name]: target.value
    }));
  };

  const createNewPost = () => {
    dispatch(createPost({post,title}));
    setFormValues({
      title: "",
      post: ""
    })
  };
  
  const submit = () => {
    isAuthenticated ? createNewPost() : dispatch(loginModalOpen());
  };

  return (
    <>
      <div className={TextAreaContainer}>
      <TextField
          className={textArea}
          placeholder={t("Title")}
          variant="outlined"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <TextField
          className={textArea}
          placeholder={t("YourPost")}
          multiline
          rows="4"
          variant="outlined"
          name="post"
          value={post}
          onChange={handleChange}
        />
        <Button color="primary" className={buttons} onClick={() => submit()}>
          {t("PostIt")}
        </Button>
      </div>
    </>
  );
};

export default PostTextArea;
