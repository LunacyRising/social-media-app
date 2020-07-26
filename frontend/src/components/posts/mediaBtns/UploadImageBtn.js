import React from "react";
import axios from "axios";
import { useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton,Tooltip } from "@material-ui/core";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

const UploadImage = ({ values, setValues, reactQuillRef, setPreviewLoading }) => {

  const useStyles = makeStyles(() => ({

    btn: {
      width: 50,
      height: 50
    },
    inputImg: {
      textAlign: "center"
    }
  })); 
  
  const classes = useStyles();

  const { inputImg, btn } = classes;

  const { isAuthenticated, token } = useSelector(state => state.authReducer);

  const { t } = useTranslation();

  const openImageInput = () => {
    const fileInput = document.getElementById("postImage");  
    fileInput.click();
  };

  const addImgToStatePreview = async (e) => {
    const image = e.target.files[0];
    const previewImage = new FormData(); 
    previewImage.append("image", image);
    setPreviewLoading(true)
    const response = await axios.post("http://localhost:5001/posts/imagePreview", previewImage, { headers: { "auth-token": token, "Content-Type": "multipart/form-data" } }); 
    setPreviewLoading(false)
    const preview = response.data.preview
    // targetea el quill
    const quill = reactQuillRef.current.getEditor();
    // focus el quill 
    quill.focus();
    const range = quill.getSelection()
    // posicion de la imagen
    const position = range ? range.index : 0;
    // inserta la imagen al editor
    quill.insertEmbed(position, "image", preview); 
    quill.setSelection(position + 1);
    // agrega al estado la imagen que se va a utilizar para subir a cloudinary, no es la misma que la preview!
    setValues({...values, media: image, mediaAlt: image.name})

  };

  return (
      <>
          <Tooltip title="add image">
              <IconButton className={btn} onClick={() => openImageInput()}> 
                <ImageOutlinedIcon fontSize="large"/>
              </IconButton>
          </Tooltip>
          <input
          className={inputImg}
          onChange={addImgToStatePreview}
          name="postImage"
          type="file"
          id="postImage"
          hidden="hidden"
          />
      </>
  );
};

export default UploadImage;