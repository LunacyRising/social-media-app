import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useTranslation } from "react-i18next";

const QuillEditor = ({ handleChangePost, value, referencia }) => {

  const { t } = useTranslation();

  return ( 
    <>
    <ReactQuill
    ref={referencia} 
    onChange={handleChangePost}
    defaultValue={value}
    theme="bubble"
    placeholder={t("YourPost")}
    />
    </>
  );
};

export default QuillEditor;
