import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button, LinearProgress, TextField } from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import Card from "./CardImg";
import SnackbarMessages from "../SnackbarMessages";
import Pagination from "./GalleryPagination";
import { uploadImage } from "../../actions/userActions/uploadImage";
import { fetchGalleryImages } from "../../actions/userActions/fetchGalleryImages"; 

const Gallery = () => {

  const useStyles = makeStyles((theme) => ({

    container: {
      width: "100%", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    contentContainer: {
      width: "80%",
      marginTop: "15vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection:"column",
    },
    cardContainer: {
      width: "90%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 40,
      "@media(min-width: 1024px)" : {
        flexDirection: "row",
        flexWrap: "wrap"
     },
     "@media(min-width: 1120px)" : {
      justifyContent: "flex-start"
     }
    },
    descriptionField: {
      backgroundColor: theme.palette.background.paper
    },
    btn: {
      marginTop: 50,
      marginBottom: 50,
      backgroundColor: theme.palette.primary.main
    },
    icon: {
      marginLeft: 10
    },
    imgAndDescription: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }
  })); 
  
  const classes = useStyles();

  const { container, contentContainer, imgAndDescription, cardContainer, descriptionField, btn, icon } = classes;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [ description, setDescription ] = useState("")

  const [ preview, setPreview ] = useState({})

  const [ image, setImage ] = useState({})

  const { imageLoading, gallery, currentPage } = useSelector(state => state.galleryReducer);

  const { userId } = useSelector(state => state.authReducer);


  const openImgInput = () => {
    const fileInput = document.getElementById("imageInput"); 
    fileInput.click();
  };

  const addImgToStatePreview = e => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file)
    setPreview(URL.createObjectURL(file))  
  };

  const addImageToGallery = () => {
    const galleryImage = new FormData()
    galleryImage.append("galleryImage", image)
    galleryImage.append("userId", userId)
    galleryImage.append("description", description)
    console.log(galleryImage)
    dispatch(uploadImage({ galleryImage }));  
    setDescription("");
    setPreview({})
  }

  useEffect(() => {
    dispatch(fetchGalleryImages())
  },[])

  return (
      <>
          <Box className={container}>
            <Box className={contentContainer}>
              <Typography variant="h2" color="primary">
                 {t("Gallery")}
              </Typography>
              <form enctype="multipart/form-data">
                  <Box className={imgAndDescription}>
                    {preview.length > 0 && <img style={{marginTop:25, animation:"expand 0.3s ease-out"}} src={preview} width={200} height={200}></img>}
                    <Button  className={btn} onClick={openImgInput}>
                      <Typography variant="caption">{t("SelectImage")}</Typography>
                      <FaceIcon className={icon}/>
                    </Button>
                    <TextField className={descriptionField} label={t("ImageDescription")} variant="outlined" name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <Button className={btn} onClick={() => addImageToGallery()}>
                        {t("UploadImage")}
                    </Button>
                    {imageLoading && <LinearProgress style={{width:"100%",marginTop: 5}}/>}
                  </Box>
                <input
                  name="galleryImage"
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={e => addImgToStatePreview(e)}
                ></input>
              </form>
              <Box className={cardContainer}>
                { gallery.length > 0 && gallery.map((image) => (
                  <>
                    <Card key={image._id} image={image.image} userName={image.userName} description={image.description}/>
                  </>
                ))}
              </Box>
              {gallery.length > 0 && <Pagination/>}
            </Box>
          </Box>
          {<SnackbarMessages/>}
      </>
  );
};

export default Gallery;