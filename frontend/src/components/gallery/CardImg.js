import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CircularProgress, Typography } from "@material-ui/core";
import TransparentCard from "./TransparentCard";

const CardImg = ({ image, userName, description }) => {

    const [ open, setOpen ] = useState(false)


    const useStyles = makeStyles(() => ({

        card: {
            position: "relative",
            display: "flex",
            width: 250,
            height: 280,
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 20,
            cursor: "pointer",
            "@media(min-width: 1024px)" : {
                marginRight: 20
             }
        },
        text: {
            paddingTop: 5,
            paddingBottom: 5
        }
      }));   
  
  const classes = useStyles(); 

  const { card, text } = classes;

  const { galleryLoading } = useSelector(state => state.galleryReducer);

  const close = () => {
      open && setOpen(false)
  }

  return (
      <>
          <Card className={card} onClick={() => setOpen(true)} onMouseLeave={ () => close()}> 
            { galleryLoading ? <CircularProgress size={50}/> :
            <>
                {open && <TransparentCard open={open}/>} 
                <img  style={{ padding: 5}} src={image} width={250} height={250}></img>
                <Typography className={text}>{description}</Typography>
            </>
            }
          </Card>
      </>
  );
};

export default CardImg;