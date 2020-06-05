import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const Gallery = () => {

  const useStyles = makeStyles(() => ({

    container: {
      width: "90%",
      height: "90%",
      margin: "30vh auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })); 
  
  const classes = useStyles();

  const { container } = classes;

  return (
      <>
          <Box className={container}>
              <Typography variant="h2" color="primary">
                 Gallery
              </Typography>
          </Box>
      </>
  );
};

export default Gallery;