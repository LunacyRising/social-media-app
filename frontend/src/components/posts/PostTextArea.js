import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../actions/postsActions/createPostAction";
import {loginModalOpen} from "../../actions/modalsActions/login";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const PostTextArea = () => {

  const {isAuthenticated} = useSelector(state => state.authReducer);
  const {darkMode} = useSelector(state => state.darkModeReducer);

  const useStyles = makeStyles(() => ({
    TextAreaContainer: {
      position: "relative",
      margin: "20vh auto",
      width: 400,
      animation: "drop2 1.8s ease-in",
      display: "flex",
      flexDirection: "column",
      "@media(min-width: 320px) and (max-width: 480px)" : {
       // width: "90%",
        //margin: "auto",
        margin: "20vh auto",
       width: "100%"
      }
    },
    buttons: {
     // position: "absolute",
     // left: 165,
     // bottom: -50,
     width: "50%",
     margin: "15px auto",
      border:  darkMode ? "solid 2px #8b70d2" : "solid 2px #8b70d2",
      backgroundColor: darkMode ? "#424242" : "white", 
      "&:hover": {
        backgroundColor: darkMode ? "#3b4248 !important" : "#8b70d2",
        color: "white",
        border: "solid 2px",
        borderColor: darkMode && "white"
      },
     /* "@media(min-width: 320px) and (max-width: 480px)" : {
        //left: 125,
       // bottom: -60
      }*/
    },
    textArea: {
      marginTop: 10,
      backgroundColor: darkMode ? "#424242" : "white" 
    },

  }));
  const classes = useStyles();
  const { TextAreaContainer, buttons, textArea } = classes; 
  /////////////////////////////////////////////////////////
  const formDefaultValues = {
    title: "",
    post: ""
  };
  const [formValues, setFormValues] = useState(formDefaultValues);
  const { title, post } = formValues;
  /////////////////////////////////////////////////////////
  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState, 
      [target.name]: target.value
    }));
  };
  /////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  //////////////////////////////////////////////////////////
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
          placeholder="Title"
          variant="outlined"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <TextField
          className={textArea}
          placeholder="Your Post..."
          multiline
          rows="4"
          variant="outlined"
          name="post"
          value={post}
          onChange={handleChange}
        />
        <Button color="primary" className={buttons} onClick={() => submit()}>
          Post it
        </Button>
      </div>
    </>
  );
};

export default PostTextArea;
