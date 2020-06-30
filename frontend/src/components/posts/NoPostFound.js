import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const NoPostFound = () => {

  const useStyles = makeStyles(() => ({

    text: {
      textAlign: "center"
    }
  })); 
  
  const classes = useStyles();

  const { text } = classes;

  const { t } = useTranslation();

  return (
      <>
        <Typography className={text} variant="h4" color="primary">No se encontro ningun post con ese termino de busqueda =(</Typography>
      </>
  );
};

export default NoPostFound;