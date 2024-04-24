import React from "react";
import {IconButton, Link } from "@material-ui/core";
import { AppBar, Grid, Toolbar } from "@material-ui/core";
import { IconContext } from "react-icons";
import { Link as LinkRouter } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import IconState from './../IconState'

const AppFrame = ({ children }) => {
    return (
        <Grid container 
        justifyContent="center">
            <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton color="inherit">
                    <Link 
                    component={LinkRouter}
                    to="/main" 
                    color="inherit" 
                    aria-label="menu">
                        <IconContext.Provider value={{size:'2em'}}>                        
                            <IconState state="clear" />
                        </IconContext.Provider>
                    </Link>
                </IconButton>                
                <Typography variant="h6" color="inherit">
                    Weather App
                </Typography>
            </Toolbar>
            </AppBar>       
            <Grid item
                xs={12}
                sm={11}
                md={10}
                lg={8}>
                    {children}
            </Grid>
        </Grid>
    )
}

AppFrame.propTypes = {

}

export default AppFrame;
