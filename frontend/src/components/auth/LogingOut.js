import React from "react"
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";


const LogingOut = () => {

    const useStyles = makeStyles(() => ({
    
        logOut: {
            display: "flex",
            justifyContent:"center",
            margin: "50vh auto 0",
            transform: "translateY(-50%)"
          }
        }
      )
    );
      const classes = useStyles();

      const { logOut } = classes;

      const { isLogingOut } = useSelector(state => state.authReducer)

    return(
        <>  
            {isLogingOut ? <Typography variant="h2" color="primary" className={logOut}>Loging Out ...</Typography> : <Redirect to="/"/>}
        </>
    )
}





export default LogingOut