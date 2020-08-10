import React from "react";
import {TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const UserNameField = ({ handleChange, editedUserName }) => {

  const useStyles = makeStyles(() => ({

    textArea: {
        backgroundColor: "black",
        color: "white",
        fontSize: 14,
        padding: 10
      }
    }
  ));
  const classes = useStyles();

  const { textArea } = classes;

  return (
    <>
     
        <TextField 
          style={{position:"absolute", left:0}}
          InputProps={{
            className: textArea
          }}
          onChange={handleChange}
          type="text"
          name="editedUserName"
          value={editedUserName}
          fullWidth="true"
        >
        </TextField>
    </>
  );
};

export default UserNameField;
