import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import CityInfo from './../components/CityInfo'
import Weather from './../components/Weather'
import WeatherDetails from './../components/WeatherDetails'
import ForecastChart from './../components/ForecastChart'
import Forecast from './../components/Forecast'
import AppFrame from '../components/AppFrame'
import useCityPage from '../hooks/useCityPage'
import { Alert } from '@material-ui/lab'

const CityPage = () => {
        
    const {city, country, state, chartData, forecastItemList, error, setError} = useCityPage()    

    return (
        <div>
            {
                error && <Alert severity="error" onClose={() => setError(null)} >{error}</Alert>
            }
            <AppFrame>
                <Grid container
                    justifyContent="space-around"
                    direction="column"
                    spacing={2}>

                    <Grid item container
                        xs={12}
                        justifyContent="center"
                        alignItems="flex-end">
                        <CityInfo city={city} country={country} />
                    </Grid>
                    <Grid container item xs={12}
                        justifyContent="center">
                        <Weather state={state.state} temperature={state.temperature} />
                        <WeatherDetails humidity={state.humidity}
                            wind={state.wind} />
                    </Grid>
                    <Grid item>{
                        chartData && <ForecastChart data={chartData} />
                    }

                    </Grid>
                    <Grid item>
                        {
                            forecastItemList && <Forecast forecastItemList={forecastItemList} />
                        }
                        <Link to="/">Ir al inicio</Link>
                    </Grid>
                </Grid>
            </AppFrame>
        </div>
    )
}

export default CityPage
