import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Picker from 'emoji-picker-react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const EmojisMenu = ({ chatBoxComponent, func, setEmojisMenuOpen, quillRef, setValues, values}) => { 

    const useStyles = makeStyles(() => ({

        pickerContainer: {
            width: "100%",
            height: "25%",
            marginTop: 10,
            "@media(min-width: 768px)" : {
                position: chatBoxComponent && "absolute",
                left: chatBoxComponent && "-100%",
                bottom: 0,
                height: chatBoxComponent ? "100%": 320,
                margin: "initial"
            },
        }
        })); 

    const classes = useStyles();

    const { pickerContainer } = classes;

    const { t } = useTranslation();

    const onEmojiClick = (event, emojiObject) => {
        return func(event, emojiObject, quillRef, setValues, values) 
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