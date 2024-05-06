import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { IconContext } from 'react-icons'
import { WiRain } from 'react-icons/wi'
import { Link } from 'react-router-dom'


const NotFoundPage = () => {
    return (
        <div>
            <Grid container
                direction='column'
                className='full'>
                <div className='highlight' >
                    <Grid item container xs={12}
                        alignItems='center'>
                        <Grid item>
                            <IconContext.Provider value={{ size: "6em" }}>
                                <WiRain />
                            </IconContext.Provider>
                        </Grid>
                        <Grid item container
                            direction='column'
                            alignItems='center'>
                            <Typography variant="h4" color='inherit' >
                                404 | Page not found
                            </Typography>
                            <Link color='inherit'
                                aria-label='menu'
                                to="/welcome">
                                Back to home
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </div>
    )
}

export default NotFoundPage
