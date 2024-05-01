import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CityInfo from './../CityInfo'
import Weather from './../Weather'
import convertUnits from 'convert-units'
import { Alert } from '@material-ui/lab'

const appid = process.env.REACT_APP_APIKEY
const getCityCode = (city, countryCode) => `${city}-${countryCode}`

// li: es un item (según tag html, tiene el role "listitem")
// renderCityAndCountry se va a convertir en una función que retorna otra función
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    const { city, country } = cityAndCountry
    return (
        <ListItem
            button
            key={city} 
            onClick={eventOnClickCity} >
            <Grid container 
            justifyContent="center"
                alignItems="center">
                <Grid item
                    md={8}
                    xs={12}>
                    <CityInfo city={city} country={country} />
                </Grid>
                <Grid item
                    md={4}
                    xs={12}>                        
                        <Weather 
                        temperature={weather && weather.temperature}
                        state={weather && weather.state} />
                </Grid>
            </Grid>
        </ListItem>
    )
}

// cities: es un array, y en cada item tiene que tener la ciudad, pero además el country
const CityList = ({ cities, onClickCity }) => {
const [allWeather, setAllWeather] = useState({})
const [error, setError] = useState(null)
    useEffect(() => {
    const setWeather = async (city, country) => {
        const st = country === 'US' ? 'CA' : ''
        const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${st},${country}&limit=1&appid=${appid}`
        
        try{
            const geoResponse = await axios.get(urlGeo)        
            const geoData = geoResponse.data
            let lat = 0
            let lon = 0        
            lat = geoData[0].lat
            lon = geoData[0].lon
            console.log(`${city}-${country}:\nLatitude ${lat}\nLongitude ${lon}`)
            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
            let weatherResponse = await new axios.get(urlWeather)

            if(!weatherResponse || !weatherResponse.data){                
                throw new Error(`No weather data for ${city},${st},${country}`)
            }

            const weatherData = weatherResponse.data
            if(weatherData !== undefined){
                let temperature = Number(convertUnits(weatherData.main.temp).from("K").to("C").toFixed(1))
                const state = weatherData.weather[0].main.toLowerCase()
                console.log(`${city}-${country}: ${temperature}, ${state}`)

                const propName = getCityCode(city, country)
                const propValue = { temperature, state }

                setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue}))
            }
        }
        catch(error){
            //Errores que nos responde el server (500, 400, etc.)
            if(error.response) {
                const { data, status } = error.response
                console.log("data", data)
                console.log("status", status)
                setError("An error has occured in the server")
            }//Errores que suceden por no llegar al server (network, host unreachable)
            else if (error.request){
                console.log("Server unreachable or no internet")           
                setError("Verify internet connection")
            }//Errores imprevistos (Others)
            else {
                console.log(`Exception: ${error.message}`)
                setError("Error loading information")
            }            
        }
    }
        
    cities.forEach(({city, country}) => {
        setWeather(city, country)
    });
}, [cities])

    return (
        <div>
            {
                error && <Alert severity="error" onClose={()=> setError(null)} >{error}</Alert>
            }
            <List>
                {
                    cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry, 
                        allWeather[getCityCode(cityAndCountry.city, cityAndCountry.country)]))
                }
            </List>
        </div>
    )
}

CityList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            city: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
        })
    ).isRequired,
    onClickCity: PropTypes.func.isRequired,
}

export default CityList
