import React from "react"
import {Typography} from "@material-ui/core"; 

const NoFavorites = () => {

    return(
        <>  
            <div style={{textAlign:"center"}}>
                <Typography color="primary" variant="h5">You Dont Have Any Saved Favorite</Typography>
            </div>
        </>
    )
}


export default NoFavorites