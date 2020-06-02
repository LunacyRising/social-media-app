import React from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite } from "../../actions/favoritesActions/deleteFavorite";
import { Typography, IconButton, Card, Tooltip, Box}  from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const Favorite = ({ postId, title, userName, favoriteId, amountOfComments, date }) => {
    
    const useStyles = makeStyles(() => ({ 
      card: {
        position: "relative",
        display: "flex",
        marginTop: 10,
        transition: "0.5s ease-out"
      },
      deleteBtn: {
          position: "absolute",
          top: 0,
          right: 0,
          width: 30,
          height: 30,
      },
      cardContent: {
          display: "flex",
          flexDirection: "column",
          marginLeft: "10%",
          padding: 10
      },
      createdBy: {
          display: "flex",
          alignItems: "center",
          marginTop: 5
      },
      creator: {
          marginRight: 10,
          fontSize: 12
      },
      commentsNumber: {
        marginTop: 8
      }
    }));
    const classes = useStyles();

    const {card, cardContent, createdBy, creator, deleteBtn, commentsNumber } = classes;

    dayjs.extend(relativeTime);

    const dispatch = useDispatch()

    let dinamicCommentWord = amountOfComments === 1 ? "Comment" :  "Comments"

    return(
        <>    
            <Card className={card}>
                <Box className={cardContent}>
                    <Tooltip title="Go To Post">
                        <Typography color="primary" component={Link} to={`/posts/${postId}`} target="_blank">{title}</Typography>
                    </Tooltip>
                        <Box className={createdBy}>
                            <Typography className={creator} variant="subtitle2">{`Created By ${userName}`}</Typography>
                            <Typography variant="caption">{dayjs(date).fromNow()}</Typography>
                        </Box>
                    <Typography className={commentsNumber} variant="caption">{`${amountOfComments} ${dinamicCommentWord}`}</Typography>
                    <Tooltip title="Remove Favorite">
                        <IconButton className={deleteBtn} onClick={() => dispatch(deleteFavorite({favoriteId}))}><HighlightOffOutlinedIcon/></IconButton> 
                    </Tooltip>
                </Box>
            </Card>
        </>
    )
}


export default Favorite