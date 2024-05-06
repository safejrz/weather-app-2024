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
import { getCityCode } from '../utils/utils'
import useCityList from '../hooks/useCityList'

const CityPage = () => {
        
    const {city, country, chartData, forecastItemList, error, setError} = useCityPage()
    const cities = React.useMemo(()=> ([{ city, country }]), [city, country])
    //[{city, country}]
    const { allWeather } = useCityList(cities)
    //const { allWeather } = useCityList([{city, country}])
    const weather = allWeather[getCityCode(city, country)]
    const temperature = weather && weather.temperature
    const state = weather && weather.state
    const humidity = weather && weather.humidity
    const wind = weather && weather.wind

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
                        <Weather state={state} temperature={temperature} />
                        {
                            humidity && wind &&
                            <WeatherDetails 
                                humidity={humidity}
                                wind={wind} />
                        }
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
