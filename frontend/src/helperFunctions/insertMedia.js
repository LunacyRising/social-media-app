
export const insertMedia = (ref, media, alt) => {
    const quill = ref.getEditor();
    //focus el quill 
    quill.focus();
    const range = quill && quill.getSelection();
    //posicion de la imagen
    let position = range ? range.index : 0;
    //inserta la imagen al editor
    quill.insertEmbed(position, "image", media, alt);
    quill.setSelection(position + 1)
  }