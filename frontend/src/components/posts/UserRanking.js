import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const UserRanking = ({creatorAmountOfPosts}) => {

    
  let dinamicWord = creatorAmountOfPosts >= 0 && creatorAmountOfPosts < 100 ?  "Newbie" :  "Elder"

  const useStyles = makeStyles(() => ({
    ranking: {
        position:"relative",
        textAlign:"center",
        backgroundColor: "#82e0aa",
        width: "50%",
        margin: "-13px auto",
        borderRadius: "5%",
        "@media(min-width: 769px)" : {
          width: "100%",
        },
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