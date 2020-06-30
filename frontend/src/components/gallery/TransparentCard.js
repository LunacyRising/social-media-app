import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card , Box , IconButton} from "@material-ui/core";
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownTwoTone';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';

const TransparentCard = ({ open }) => {

    const useStyles = makeStyles(() => ({

        card: {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            display: !open ? "none" : "flex",
            width: 250,
            height: 280,
            justifyContent: "flex-end",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 20,
            "@media(min-width: 1024px)" : {
                marginRight: 20
             }
        },
        btnContainer: {
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            marginBottom: 50
        },
        btn: {
            width: 20,
            height: 20,
           
        }
      }));   
  
  const classes = useStyles(); 

  const { card, btnContainer, btn } = classes;

  return (
      <>
          <Card className={card}> 
            <Box className={btnContainer}>
                <IconButton className={btn} color="primary">
                    <ThumbUpTwoToneIcon/>
                </IconButton>
                <IconButton className={btn} color="primary">
                    <ThumbDownTwoToneIcon/>
                </IconButton>
                <IconButton className={btn} color="primary">
                    <StarTwoToneIcon/>
                </IconButton>
            </Box>
          </Card>
      </>
  );
};

export default TransparentCard;