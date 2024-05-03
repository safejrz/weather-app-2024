import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { useParams } from 'react-router-dom'
import CityInfo from './../components/CityInfo'
import Weather from './../components/Weather'
import WeatherDetails from './../components/WeatherDetails'
import ForecastChart from './../components/ForecastChart'
import Forecast from './../components/Forecast'
import AppFrame from '../components/AppFrame'
import axios from 'axios'
import convertUnits from 'convert-units'
import { Alert } from '@material-ui/lab'

const appid = process.env.REACT_APP_APIKEY
const dataExample = [
    {
        "dayHour": "Jue 18",
        "min": 14,
        "max": 22,
    },
    {
        "dayHour": "Vie 06",
        "min": 18,
        "max": 27,
    },
    {
        "dayHour": "Vie 12",
        "min": 18,
        "max": 28,
    },
    {
        "dayHour": "Vie 18",
        "min": 18,
        "max": 25,
    },
    {
        "dayHour": "Sab 06",
        "min": 15,
        "max": 22,
    },
    {
        "dayHour": "Sab 12",
        "min": 12,
        "max": 19,
    }
]

const forecastItemListExample = [
    { hour: 18, state: "clear", temperature: 17, weekDay: "Jueves" },
    { hour: 6, state: "clouds", temperature: 18, weekDay: "Viernes" },
    { hour: 12, state: "drizzle", temperature: 18, weekDay: "Sábado" },
    { hour: 19, state: "snow", temperature: 18, weekDay: "Sábado" }, //This icon does not work.
    { hour: 18, state: "thunderstorm", temperature: 19, weekDay: "Domingo" },
    { hour: 14, state: "thunderstorm", temperature: 17, weekDay: "Lunes" },
    { hour: 14, state: "thunderstorm", temperature: 17, weekDay: "Martes" }
]

const CityPage = () => {
    const [data, setData] = useState(null)
    const [state, setState] = useState({
        temperature: 0,
        state: "clear",
        humidity: 0,
        wind: 0
    })
    const [error, setError] = useState(null)

    const [forecastItemList, setForecastItemList] = useState(null)
    const params = useParams()

    const { city, country } = useParams()

    useEffect(() => {

        const getForecast = async () => {

            try {
                const st = country === 'US' ? 'CA' : ''
                const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${st},${country}&limit=1&appid=${appid}`
                let geoResponse = await axios.get(urlGeo)
                const geoData = geoResponse.data
                let lat = geoData[0].lat
                let lon = geoData[0].lon

                //// PROBLEM: API is no longer free, this endpoint is only available through suscription:
                // const urlForecast = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${appid}`
                // let forecastResponse = await axios.get(urlForecast)

                // if (!forecastResponse || !forecastResponse.data) 
                // {
                //     console.log("Error thrown!!!!!!!!!!!!")
                //     throw new Error(`No weather data for ${city},${st},${country}`)
                // }

                // const forecastData = forecastResponse.data
                // console.log("[data]", forecastData)
                // console.log("[data]", data)

                const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
                let weatherResponse = await new axios.get(urlWeather)

                if (!weatherResponse || !weatherResponse.data) {
                    throw new Error(`No weather data for ${city},${st},${country}`)
                }

                const weatherData = weatherResponse.data
                if (weatherData !== undefined) {
                    const temperature = Number(convertUnits(weatherData.main.temp).from("K").to("C").toFixed(1))
                    const state = weatherData.weather[0].main.toLowerCase()
                    const wind = weatherData.wind.speed
                    setState({
                        temperature: temperature,
                        state: state,
                        humidity: 0,
                        wind: wind
                    })
                }
            }
            catch (error) {
                //Errores que nos responde el server (500, 400, etc.)
                if (error.response) {
                    const { data, status } = error.response
                    console.log("data", data)
                    console.log("status", status)
                    // setError("An error has occured in the server")
                }//Errores que suceden por no llegar al server (network, host unreachable)
                else if (error.request) {
                    console.log("Server unreachable or no internet")
                    // setError("Verify internet connection")
                }//Errores imprevistos (Others)
                else {
                    console.log(`Exception: ${error.message}`)
                    // setError("Error loading information")
                }
            }
        }

        getForecast()
        setData(dataExample)
        setForecastItemList(forecastItemListExample)
    }, [city, country])

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
                        data && <ForecastChart data={data} />
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
