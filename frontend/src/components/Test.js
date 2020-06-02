import React, {useState} from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group' 
import { Typography,Divider,Box} from "@material-ui/core";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components';
import {Notification} from "../styledComponents/Notification";

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
  const {menuItem, noNotifications, noti, createdAt, deleteBtn,deleteIcon} = classes; 
  /////////////////////////////////////////////////////////
 
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


  return ( 
    <div style={{margin: "30vh auto", width: "20%", height:"100%", backgroundColor: "gray", transition: "all 0.5s"}}>
     <TransitionGroup component={null}>
            {testAnimation.map(test => (
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
        <button onClick={() => setTestAnimation([extra, ...testAnimation])}>click</button>
    </div>
  );
};

export default Test;
