import  { useState, useEffect } from 'react'
import axios from 'axios'
import { getCityCode, toCelcius } from './../utils/utils'

const appid = process.env.REACT_APP_APIKEY

const useCityList = (cities) => {    
    const [allWeather, setAllWeather] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        const setWeather = async (city, country) => {
            const st = country === 'US' ? 'CA' : ''
            const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${st},${country}&limit=1&appid=${appid}`

            try {
                const geoResponse = await axios.get(urlGeo)
                const geoData = geoResponse.data
                let lat = 0
                let lon = 0
                lat = geoData[0].lat
                lon = geoData[0].lon
                console.log(`${city}-${country}:\nLatitude ${lat}\nLongitude ${lon}`)
                const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
                let weatherResponse = await new axios.get(urlWeather)

                if (!weatherResponse || !weatherResponse.data) {
                    throw new Error(`No weather data for ${city},${st},${country}`)
                }

                const weatherData = weatherResponse.data
                if (weatherData !== undefined) {
                    let temperature = toCelcius(weatherData.main.temp)
                    const state = weatherData.weather[0].main.toLowerCase()
                    const humidity = 0
                    const wind = weatherData.wind.speed
                    console.log(`${city}-${country}: ${temperature}, ${state}`)

                    const propName = getCityCode(city, country)
                    const propValue = { temperature, state, humidity, wind }

                    setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue }))
                }
            }
            catch (error) {
                //Errores que nos responde el server (500, 400, etc.)
                if (error.response) {
                    const { data, status } = error.response
                    console.log("data", data)
                    console.log("status", status)
                    setError("An error has occured in the server")
                }//Errores que suceden por no llegar al server (network, host unreachable)
                else if (error.request) {
                    console.log("Server unreachable or no internet")
                    setError("Verify internet connection")
                }//Errores imprevistos (Others)
                else {
                    console.log(`Exception: ${error.message}`)
                    setError("Error loading information")
                }
            }
        }

        cities.forEach(({ city, country }) => {
            setWeather(city, country)
        });
    }, [cities])

    return { allWeather, error, setError } // tambien se puede regresar como array
}

export default useCityList