import React from 'react'
import WelcomeScreen from '../components/WelcomeScreen'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { WiDaySunny } from 'react-icons/wi'

const WelcomePage = () => {
    return (
        <WelcomeScreen>
            <h1 className='welcometext'>Welcome</h1>
            <Grid container
                direction='column'
                justify='center'        
                className='full'>
                <div className='highlight' >                
                    <Grid item container xs={12}
                    justify='center'
                    alignItems='center'>
                        <Grid item>     
                        <IconContext.Provider value={{ size: "6em"}}>
                            <WiDaySunny />
                        </IconContext.Provider>
                        </Grid>
                        <Grid item container
                        direction='column'
                            justify='center'
                            alignItems='center'>                        
                            <Typography variant="h4" color='inherit' >            
                                Weather App                            
                            </Typography>
                            <Link color='inherit' 
                            aria-label='menu'
                            
                            to="/main">
                                Enter
                            </Link>
                        </Grid>
                    </Grid>                
                </div>
            </Grid>      
        </WelcomeScreen>
    )
}

export default WelcomePage
