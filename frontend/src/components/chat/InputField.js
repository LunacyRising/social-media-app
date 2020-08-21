import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField } from "@material-ui/core"; 

const InputField = ({ chatMsg, removeAlert, handleChange, submitMsg }) => { 

  const useStyles = makeStyles(() => ({ 

    messageInputContainer: {
        width: "90%",
        margin: "25px auto 0px"
    },
    messageInput: {
        width: "100%",
        pointerEvents: "all"
    }
  }));

  const classes = useStyles();

  const { messageInputContainer, messageInput } = classes;

  const { t } = useTranslation();

  return (
    <>
        <Box className={messageInputContainer}>
            <form onSubmit={submitMsg} autoComplete="off">
                <TextField  className={messageInput} value={chatMsg} onFocus={removeAlert} onChange={handleChange} placeholder={t('Chat.placeholder')} />
            </form>
        </Box>
    </>
  );
};

export default InputField;