import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Card , TextField, CircularProgress} from "@material-ui/core";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { fetchGifs } from "../../actions/gifsActions/fetchGifs";
import { updateQuery } from "../../actions/gifsActions/updateQuery";
import useInfiniteScroll from "./useInfiniteScroll"; 

const GifsMenu = ({ setGifstMenuOpen, values, setValues, referencia }) => { 

  const useStyles = makeStyles(() => ({

    menuContainer:{
        position: "absolute",
        top: -80,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        overflow: "visible",
        zIndex: 5
    },
    contentWrapper: {
      width: "90%",
      margin: "auto"
    },
    exitAndTextField: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10
    },
    exitBtn: {
        width: 20,
        height: 20,
        marginRight: 5
    },  
    field: {
        height: 40
    },
    gifsContainer: {
        width: "100%"
    },
    gifsBox: {
        width: "100%",
        height: 325,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "auto"
    },
    singleGif: {
        cursor: "pointer",
        width: 110,
        height: 110 
    },
    spinner: {
        margin: "auto"
    }
  })); 


  const classes = useStyles();

  const { contentWrapper, menuContainer, exitAndTextField, exitBtn, field, gifsContainer, gifsBox, singleGif, spinner } = classes;

  const { gifs, maxResults , gifsLoading, gifOffset, gifQuery } = useSelector(state => state.gifsReducer);

  const maxResultsNotReached = maxResults > gifOffset;

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  const { lastElement } = useInfiniteScroll( fetchGifs, maxResultsNotReached, gifsLoading );  

    useEffect(() => {
    dispatch(fetchGifs())
  },[])

  const targetOneGif = (id) => {
    const oneGif = gifs.filter(gif => gif.slug === id);
    const oneGifUrl = oneGif[0].images.downsized_large.url;
    console.log(oneGifUrl)
    const quill = referencia.current.getEditor();
    quill.focus();
    console.log(referencia.current)
    let range = quill.getSelection()
    let position = range ? range.index : 0;
    console.log(quill.insertEmbed)
    quill.insertEmbed(position, "image",  oneGifUrl , oneGif.userName ); 
    quill.setSelection(position + 1);
    setValues({...values, gif: oneGifUrl });
    dispatch(updateQuery(null))
    setGifstMenuOpen(false)
    console.log(values)
  }

  const handleSearch = (e) => {
    dispatch(updateQuery(e))
    dispatch(fetchGifs())
  }

  const closeGifsMenu = () => {
     dispatch(updateQuery(null));
     setGifstMenuOpen(false) 
  }

  return (
      <>
          <Card className={menuContainer}>
              <Box className={contentWrapper}>
                <Box className={exitAndTextField}>
                  <IconButton className={exitBtn} onClick={() => closeGifsMenu()}>
                      <HighlightOffRoundedIcon/>
                  </IconButton>
                  <TextField 
                  style={{width: "100%"}}
                  InputProps={{
                    className: field
                  }}
                  variant="outlined" 
                  label="Buscar gif"
                  onChange={(e) => handleSearch(e.target.value)}
                  value={gifQuery}
                  />
                </Box>
                <Box className={gifsContainer}>
                  <Box className={gifsBox}>
                      { maxResults === 0 ? <p>no se encontro nada</p> : 
                      gifs && gifs.map((gif, index) => (
                          <div key={index} ref={ gifs.length === index + 1 ? lastElement : null}>
                              <img className={singleGif} loading="lazy" onClick={ () => targetOneGif(gif.slug)} src={gif.images.downsized_large.url} alt={gif.userName}/>
                          </div>
                      ))}
                  {gifsLoading && <CircularProgress className={spinner} size={100}/>}   
                  </Box>
                </Box>
              </Box>
          </Card>   
      </>
  );
};

export default React.memo(GifsMenu);