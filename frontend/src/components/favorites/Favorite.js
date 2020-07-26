import React from "react"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFavorite } from "../../actions/favoritesActions/deleteFavorite";
import { Typography, IconButton, Card, Tooltip, Box}  from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const Favorite = ({ media, mediaAlt, title, userName, favoriteId, amountOfComments, date }) => { 
    
    const useStyles = makeStyles(() => ({ 
      card: {
            position: "relative",
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            transition: "0.5s ease-out",
            height: 80
        },
        cardContent: {
            display: "flex",
            flexDirection: "column",
            marginLeft: 15,
            padding: 10
        },
        mediaContainer: {
            width: "30%",
            height: "100%",
            "@media(min-width: 1024px)" : {
                width: "20%",
            },
        },    
        mediaStyle: {
            width: "100%",
            height: "100%",
            objectFit: "cover"
        },
        favoriteTitle: {
            fontSize: 10,
            "@media(min-width: 468px)" : {
                fontSize: 12
            },
        }, 
        createdBy: {
            display: "flex",
            alignItems: "center",
            marginTop: 5
        },  
        creator: {
            marginRight: 10,
            fontSize: 9,
            "@media(min-width: 468px)" : {
                fontSize: 11
            },
        },
        createdAt: {
            fontSize: 9,
            "@media(min-width: 468px)" : {
                fontSize: 11
            },
        }, 
        commentsNumber: {
            fontSize: 9,  
            marginTop: 8,
            "@media(min-width: 468px)" : {
                fontSize: 11
            },
        }, 
        deleteBtn: {
            position: "absolute",
            top: 0,
            right: 0,
            width: 15,
            height: 15,
        },
        deleteIcon: {
            fontSize: 15
        }
    }));
    const classes = useStyles();

    const {card, cardContent, mediaContainer, mediaStyle, favoriteTitle, createdBy, creator, createdAt, commentsNumber, deleteBtn, deleteIcon } = classes;

    dayjs.extend(relativeTime);

    const dispatch = useDispatch()

    let dinamicCommentWord = amountOfComments === 1 ? "Comment" :  "Comments"

    return(
        <>    
            <Card className={card}>
                <Box className={mediaContainer}>
                    <img className={mediaStyle} src={media} alt={mediaAlt}/>
                </Box>
                <Box className={cardContent}>
                    <Tooltip title="Go To Post">
                        <Typography  className={favoriteTitle} color="primary" component={Link} to={`/posts/${favoriteId}`} target="_blank">{title}</Typography>
                    </Tooltip>
                        <Box className={createdBy}>
                            <Typography className={creator} variant="subtitle2">{`Created By ${userName}`}</Typography>
                            <Typography className={createdAt}variant="caption">{dayjs(date).fromNow()}</Typography>
                        </Box>
                    <Typography className={commentsNumber} variant="caption">{`${amountOfComments} ${dinamicCommentWord}`}</Typography>
                    <Tooltip title="Remove Favorite">
                        <IconButton className={deleteBtn} onClick={() => dispatch(deleteFavorite(favoriteId))}><HighlightOffOutlinedIcon className={deleteIcon}/></IconButton> 
                    </Tooltip>
                </Box>
            </Card>
        </>
    )
}


export default Favorite