import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const NoResults = () => {

  const useStyles = makeStyles(() => ({

    text: {
      textAlign: "center" 
    }
  })); 
  
  const classes = useStyles();

  const { text } = classes;

  const { query } = useSelector(state => state.postReducer);

  const { t } = useTranslation();

  return (
      <>
        <Typography className={text} variant="h4" color="primary">{`${t("NoResults")} ${query}`}</Typography>
      </>
  );
};

export default NoResults;