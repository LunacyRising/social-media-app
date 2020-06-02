import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {

  const { role } = useSelector(state => state.authReducer);

  ////////////////////////////////////////////////////////////////////////
  return role !== "admin" ? (
    <Redirect to="/user" />
  ) : (
    <>
      <div className="formContainer">
        <h1>Admin Page</h1>
      </div>
    </>
  );
};

export default Admin;
