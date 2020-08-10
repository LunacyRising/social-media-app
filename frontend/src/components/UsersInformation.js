import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UsersTable from "./UsersTable";
import { Redirect } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../actions/userActions/fetchUsersAction";
import { clearMessages } from "../actions/messagesActions";

const UsersInformation = () => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    formContainer: {
      margin: "15vh auto",
      width: "300px",
      height: " 110px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease",
      boxShadow: "0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #b3b3b3"
    }, 
    buttons: {
      border: "solid 2px #8b70d2",
      marginRight: "5px",
      color: "#8b70d2",
      marginTop: "10px",
      transition: "0.2s ease",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white"
      }
    }
  }));
  const classes = useStyles();
  const { formContainer, buttons } = classes;

  ////////////////////////////////////////////////////////////////////////
  const authReducer = useSelector(state => state.authReducer);
  const messagesReducer = useSelector(state => state.messagesReducer);
  const fetchUsersReducer = useSelector(state => state.fetchUsersReducer);
  const dispatch = useDispatch();
  const clearMessagesDispatch = () => dispatch(clearMessages());
  const fetchUsersDispatch = () => dispatch(fetchUsers({ token }));
  /////////////////////////////////////////////////////////////////
  const { messageCode } = messagesReducer;
  const { token, role } = authReducer;
  const { users, isLoading } = fetchUsersReducer;
  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchUsersDispatch();
  }, []);
  /////////////////////////////////////////////////////////////////////
  return role !== "admin" ? (
    <Redirect to="/user" />
  ) : (
    <>
      <div onMouseOver={clearMessagesDispatch} className={formContainer}>
        <Button className={buttons} onClick={fetchUsersDispatch}>
          Fetch Users
        </Button>
      </div>
      {isLoading || !users ? (
        <div className="marginLeft">
          <CircularProgress size={100} />
        </div>
      ) : (
        <UsersTable
          users={users}
          token={token}
          clearMessages={clearMessagesDispatch}
          messageCode={messageCode}
          reloadTable={fetchUsersDispatch}
        />
      )}
    </>
  );
};

export default UsersInformation;
