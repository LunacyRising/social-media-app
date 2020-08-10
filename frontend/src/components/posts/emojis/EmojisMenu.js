import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Picker from 'emoji-picker-react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const EmojisMenu = ({ setEmojisMenuOpen, quillRef }) => { 

    const useStyles = makeStyles(() => ({

        pickerContainer: {
            pickerContainer: "center",
            "@media(min-width: 480px)" : {
                width: "70%",
                margin: "auto"
            },
        }
        })); 

    const classes = useStyles();

    const { pickerContainer } = classes;

    const { t } = useTranslation();

    const onEmojiClick = (event, emojiObject) => {
        const quill = quillRef.current.getEditor();
        quill.focus();
        let range = quill.getSelection();
        let position = range ? range.index : 0;
        console.log(quill.insertEmbed);
        quill.insertEmbed(position, "text", emojiObject.emoji); 
        quill.setSelection(position + 2);
    };

  return (
      <>
        <ClickAwayListener onClickAway={() => setEmojisMenuOpen(false)}>
        <div className={pickerContainer}>
            <Picker onEmojiClick={onEmojiClick}
            groupNames={{
            smileys_people: t('EmojiPicker.smileys_people'),
            animals_nature: t('EmojiPicker.animals_nature'),
            food_drink: t('EmojiPicker.food_drink'),
            travel_places: t('EmojiPicker.travel_places'),
            activities: t('EmojiPicker.activities'),
            objects: t('EmojiPicker.objects'),
            symbols: t('EmojiPicker.symbols'),
            flags: t('EmojiPicker.flags'),
            recently_used: t('EmojiPicker.recently_used'),
            }}
            />
        </div>
        </ClickAwayListener>
      </>
  );
};

export default React.memo(EmojisMenu);