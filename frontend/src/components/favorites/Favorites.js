import React,{ useEffect } from "react";  
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { CircularProgress, Container, Box } from "@material-ui/core"; 
import { makeStyles } from "@material-ui/core/styles";
import { fetchFavorites } from "../../actions/favoritesActions/fetchFavorites";
import SnackBarMessages from "../SnackbarMessages";
import Favorite from "./Favorite";
import NoFavorites from "./NoFavorites"; 



const Favorites = () => {

    const useStyles = makeStyles(() => ({

        cardsContainer: {
            marginTop: 50
        },
        spinner: {
            display: "flex",
            justifyContent:"center",
            margin: "50vh auto 0",
            transform: "translateY(-50%)"  
        }
      }));
    const classes = useStyles();

    const { cardsContainer, spinner  } = classes;

    const dispatch = useDispatch();  

    useEffect(() => {
        dispatch(fetchFavorites())   
    },[]) 

    const { favorites, favoritesLoading } = useSelector(state => state.favoritesReducer);

    const { isAuthenticated } = useSelector(state => state.authReducer);

    return(
        <>
            { isAuthenticated ? 
                <Container className={cardsContainer} fixed> 
                {favoritesLoading ? <Box className={spinner}><CircularProgress size={180}/></Box> :
                 <TransitionGroup component={null}> 
                    {favorites.length > 0 ? favorites.map(favorite => (
                        <CSSTransition
                        key={favorite._id}
                        timeout={500}
                        classNames="favorite" 
                        unmountOnExit={true}
                        >
                        <Favorite
                        key={favorite._id}
                        favoriteId={favorite._id}
                        gif={favorite.gif}
                        media={favorite.media}
                        mediaAlt={favorite.mediaAlt}
                        title={favorite.title}  
                        userName={favorite.userName}
                        amountOfComments={favorite.amountOfComments}
                        date={favorite.date}
                        />
                        </CSSTransition>)) : <NoFavorites/>}
                </TransitionGroup>}   
            </Container>: <Redirect to="/" />
            }
            <SnackBarMessages/>
        </>
    )
}


export default Favorites