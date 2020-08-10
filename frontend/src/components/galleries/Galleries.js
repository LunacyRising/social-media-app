import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const Gallery = () => {

  const useStyles = makeStyles((theme) => ({

    container: {
      width: "100%", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    contentContainer: {
      width: "80%",
      marginTop: "15vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection:"column",
    },
    cardContainer: {
      width: "90%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 40,
      "@media(min-width: 1024px)" : {
        flexDirection: "row",
        flexWrap: "wrap"
     },
     "@media(min-width: 1120px)" : {
      justifyContent: "flex-start"
     }
    },
    descriptionField: {
      backgroundColor: theme.palette.background.paper
    },
    btn: {
      marginTop: 50,
      marginBottom: 50
    },
    icon: {
      marginLeft: 10
    },
    imgAndDescription: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }
  })); 
  
  const classes = useStyles();


  return (
      <>
         
      </>
  );
};

export default Gallery;