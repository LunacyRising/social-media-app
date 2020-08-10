import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Card , TextField } from "@material-ui/core";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import dots from "../../utils/images/dots.svg";
import { fetchGifs } from "../../actions/gifsActions/fetchGifs";
import { updateQuery } from "../../actions/gifsActions/updateQuery";
import useInfiniteScroll from "./useInfiniteScroll"; 


const GifsMenu = ({ quillModal, setGifstMenuOpen, values, setValues, quillRef }) => { 

  useEffect(() => {
    console.log("quillModal", quillModal)
  },[])

  const colorsArr = ["#f7347a", "#5ac18e", "#008080", "#e6e6fa", "#fa8072", "#8a2be2", "#088da5", "#333333"];

  const { darkMode } = useSelector(state => state.darkModeReducer);

  const useStyles = makeStyles((theme) => ({

    menuContainer:{
        position: "absolute",
        top: quillModal ? 10 : -80,
        left: "50%",
        transform: "translateX(-50%)",
        width: "inherit",
        height: quillModal ? "auto" : "100%",
        backgroundColor: darkMode ? "#0e1111" : theme.palette.background.paper,
        overflow: "visible",
        zIndex: 5,
        "@media(min-width: 480px and) and (max-width: 568px)" : {
          width: quillModal ? "70%" : "inherit"
        },
        "@media(min-width: 768px)" : {
          width: quillModal ? "50%" : "inherit"
        },
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
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      maxHeight: 350,
      overflow: "hidden auto"
    },
    gifBox: {
      width: "28%",
      margin: 5,
      backgroundColor: colorsArr[Math.floor(Math.random() * colorsArr.length)],
      cursor: "pointer"
    },  
    singleGif: {
      width: "100%",
      height: "100%"
    },
    noResults: {
        margin: "10px auto",
    },
    loader: {
      width: "50%",
      margin: "10px auto"
    }
  })); 

  const classes = useStyles();

  const { contentWrapper, menuContainer, exitAndTextField, exitBtn, field, gifsContainer, gifBox, singleGif, noResults, loader } = classes;

  const { gifs, maxResults , gifsLoading, gifOffset, gifQuery } = useSelector(state => state.gifsReducer);

  const maxResultsNotReached = maxResults > gifOffset;

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  const { lastElement } = useInfiniteScroll( fetchGifs, maxResultsNotReached, gifsLoading );  

  useEffect(() => {
    dispatch(fetchGifs())
  },[])


  const targetOneGif = (title, gif) => {
    const quill = quillRef.current.getEditor(); 
    quill.focus();
    const range = quill.getSelection();
    let position = range ? range.index : 0;
    quill.insertEmbed(position, "image", gif, title); 
    quill.setSelection(position + 1);
    setValues({...values, media: gif, mediaAlt: title});
    dispatch(updateQuery(null));
    setGifstMenuOpen(false);
  }


  const handleSearch = (e) => {
    dispatch(updateQuery(e.target.value))
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
                  onChange={handleSearch}
                  value={gifQuery}
                  />
                </Box>
                <Box className={gifsContainer}>
                      { maxResults === 0 && !gifsLoading ? <p className={noResults}>no se encontro nada</p> : 
                      gifs && gifs.map((gif, index) => (
                      <Box key={gif.id} className={gifBox}>
                        <img ref={ gifs.length === index + 1 ? lastElement : null} className={singleGif} loading="lazy" onClick={ () => targetOneGif(gif.title, gif.images.downsized_large.url)} src={gif.images.preview_gif.url} alt={gif.userName}/>
                      </Box>
                      ))}
                  {gifsLoading && <img className={loader} src={dots} alt="loading"/>}
                </Box>
              </Box>
          </Card>   
      </>
  );
};

export default React.memo(GifsMenu);