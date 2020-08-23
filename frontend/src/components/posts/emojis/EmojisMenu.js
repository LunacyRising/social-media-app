import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Picker from 'emoji-picker-react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const EmojisMenu = ({ chatBoxComponent, func, setEmojisMenuOpen, quillRef, setChatMessage, messageInfo, saveMessage, socket }) => { 

    const useStyles = makeStyles(() => ({

        pickerContainer: {
           // position: chatBoxComponent && "absolute",
            //top: chatBoxComponent && "40%",
            //left: chatBoxComponent && "50%",
            width: "100%",
            height: "22%",
            marginTop: 10,
            overflowY: "scroll",
            //transform: chatBoxComponent && "translateX(-50%)",
            "@media(min-width: 480px)" : {
                //width: !chatBoxComponent && "70%",
                //margin: "auto"
            },
            "@media(min-width: 480px)" : {
                //top: chatBoxComponent && 0,
                //left: chatBoxComponent && "-65%",
            },
            "@media(min-width: 768px)" : {
                position: chatBoxComponent && "absolute",
                top: chatBoxComponent && "40%",
                left: chatBoxComponent && "50%",
                transform: chatBoxComponent && "translateX(-50%)",
            },
        }
        })); 

    const classes = useStyles();

    const { pickerContainer } = classes;

    const { t } = useTranslation();

    const chatBoxObj = { setChatMessage, messageInfo, saveMessage, socket }

    const onEmojiClick = (event, emojiObject) => {
        return func(event, emojiObject, quillRef, chatBoxObj)
    }

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