import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group' 
import { Typography } from "@material-ui/core";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { makeStyles } from "@material-ui/core/styles";
import { Notification } from "../styledComponents/Notification";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Test = () => {

  const useStyles = makeStyles(() => ({
    menuItem: {
      position: "relative", 
      display: "flex",
      justifyContent:"space-around",
      flexDirection: "column",
      transition: "0.5s",
      backgroundColor: "black",
      color: "white"
    },
    noNotifications: {
      paddingRight: 10,
      paddingLeft: 10,
      padding: 10,
      textAlign: "center",
      whiteSpace: "nowrap"
    },
    noti: {
     paddingLeft: 10,
     marginTop: 20
    },
    createdAt: {
      paddingLeft: 10,
      fontSize: 10
    },
    deleteBtn: {
      position: "absolute",
      top: -2,
      right: 2,
      cursor: "pointer"
    },
    deleteIcon: {
      fontSize: 16
    }
  })); 

  const classes = useStyles();
  const { noti, createdAt, deleteBtn,deleteIcon} = classes; 
  /////////////////////////////////////////////////////////

  const userId = 1

  const postId = 1111

  const [ posts , setPosts] = useState([
    {
      post: "hola post 1",
      postId: 21,
      userId: 1,
      likes : 1
    },
    {
      post: "hola post 2",
      postId: 22,
      userId: 1,
      likes : 2
    },
    {
      post: "hola post 3",
      postId: 23,
      userId: 1,
      likes : 3
    },
    {
      post: "hola post 4",
      postId: 24,
      userId: 1,
      likes : 4
    },
  ])

  const [ likes, setLikes ] = useState(0)


  const [testAnimation, setTestAnimation] = useState([
    {
      id: 1,
      message: "galletita2 liked your post! quinto post...",
      date: "March 29, 2020"
    },
    {
      id: 2,
      message: "galletita2 liked your post! sexto post...",
      date: "March 29, 2020"
    },
    {
      id: 3,
      message: "galletita2 liked your post! sexto post...",
      date: "March 29, 2020"
    },
    {
      id: 4,
      message: "galletita2 liked your post! sexto post...",
      date: "March 29, 2020"
    },
    {
      id: 5,
      message: "galletita2 liked your post! sexto post...",
      date: "March 29, 2020"
    },
  ])

  

  const deleteNoti = (id) => { 
    let t = [...testAnimation].filter(item => item.id !== id)
    setTestAnimation(t)
  }

  let extra = 
    {id: 6,
    message: "galletita222 liked your post! quinto post...!",
    date: "March 29, 2010"}

   
    
		const modules = {
			toolbar: [
		      [{ 'font': [] }],
		      [{ 'size': ['small', false, 'large', 'huge'] }],
		      ['bold', 'italic', 'underline'],
		      [{'list': 'ordered'}, {'list': 'bullet'}],
		      [{ 'align': [] }],
		      [{ 'color': [] }, { 'background': [] }],
		      ['clean']
		    ]
		};

		const formats = [
		    'font',
		    'size',
		    'bold', 'italic', 'underline',
		    'list', 'bullet',
		    'align',
		    'color', 'background'
	  	];

  return ( 
    <>
    {/*<div style={{margin: "30vh auto", width: "20%", height:"100%", backgroundColor: "gray", transition: "all 0.5s"}}>
      <h2 style={{textAlign: "center"}}>{likes}</h2>
     <TransitionGroup component={null}>
            {testAnimation.map(test => (
              // testAnimation.length === index + 1 ?
                <CSSTransition
                key={test.id}
                timeout={600}
                classNames="item"
                >
                <>
                  <Notification>
                      <Typography className={noti} variant="caption">{test.message}</Typography>
                      <Typography  className={createdAt} variant="caption">{test.date}</Typography>
                      <iconButton className={deleteBtn} onClick={() => (deleteNoti(test.id))}><HighlightOffOutlinedIcon className={deleteIcon}/></iconButton>
                  </Notification>
                 
                </> 
                </CSSTransition>
             ))} 
        </TransitionGroup>

        <ReactQuill
          formats={formats}
          modules={modules}
          >
          </ReactQuill>
        <button onClick={() => setTestAnimation([extra, ...testAnimation])}>click</button>
        <button onClick={() => test()}>increase likes</button>
    </div>*/}
    <ReactQuill
      theme="snow"
      //modules={modules}
     // formats={formats}
      />
    </>
  );
};

export default Test;
