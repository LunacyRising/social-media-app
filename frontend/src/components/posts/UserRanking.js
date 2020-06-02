import React from "react";
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const UserRanking = ({creatorAmountOfPosts}) => {

    
  let dinamicWord = creatorAmountOfPosts >= 0 && creatorAmountOfPosts < 100 ?  "Newbie" :  "Elder"

  const useStyles = makeStyles(() => ({
    ranking: {
        position:"relative",
        textAlign:"center",
        backgroundColor: "#82e0aa",
        width: "80%",
        margin: " -5px auto",
        borderRadius: "5%",
        '&::before': {
          position: 'absolute',
          bottom: "5px",
          left: "0px",
          width: "5%",
          height: "100%",
          borderTopLeftRadius:"3px",
          backgroundColor: "#82e0aa",
          content: '""',
        },
        '&::after': {
          position: 'absolute',
          bottom: "5px",
          right: "0px",
          width: "5%",
          height: "100%",
          borderTopRightRadius:"3px",
          backgroundColor: "#82e0aa",
          content: '""',
        },
      } 
  }));
  const classes = useStyles();
  const {ranking} = classes;
 
    return (
        <>
            <Typography className={ranking} color="primary">{dinamicWord}</Typography>
        </>
    );
};

export default UserRanking;