import React,{ useRef } from "react";
import { useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton,Tooltip } from "@material-ui/core";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

const UploadImageBtn = ({ chatBoxComponent, func, values, setValues, quillRef, setPreviewLoading, messageInfo, saveMessage, socket }) => {

  const useStyles = makeStyles((theme) => ({

    btn: {
      width: !chatBoxComponent ? 34 : 25,
      height: !chatBoxComponent ? 34 : 25,
      marginRight: chatBoxComponent && 10,
      transition: "0.3s ease-in-out",
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: "transparent"
      }
    },
    icon:{
      fontSize: !chatBoxComponent ? 34 : 25,
    },
    inputImg: {
      textAlign: "center"
    }
  })); 
  
  const classes = useStyles();

  const { inputImg, icon, btn } = classes;

  const { token } = useSelector(state => state.authReducer);

  const { t } = useTranslation();

  const inputRef = useRef();

  const openImageInput = () => {
    inputRef.current.click()
  };

  return (
      <>
          <Tooltip title="add image">
              <IconButton className={btn} onClick={openImageInput}> 
                <ImageOutlinedIcon className={icon}/> 
              </IconButton>
          </Tooltip>
          <input
          className={inputImg}
          ref={inputRef}
          onChange={(e) => func(e, {setPreviewLoading, token, quillRef, values, setValues, messageInfo, saveMessage, socket })}
          name="postImage"
          type="file"
          hidden="hidden"
          />
      </>
  );
};

export default UploadImageBtn;