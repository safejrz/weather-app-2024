import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CityInfo from './../CityInfo'
import Weather from './../Weather'
import convertUnits from 'convert-units'

const appid = "62cbfa07b22ea0d74c79b059f7305a4d"

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
                alignItems="center"
            >
                <Grid item
                    md={8}
                    xs={12}>
                    <CityInfo city={city} country={country} />
                </Grid>
                <Grid item
                    md={4}
                    xs={12}>
                    {
                        weather ? 
                        (<Weather 
                        temperature={weather.temperature}
                        state={weather.state} />) : 
                        ("No data")
                    }                    
                </Grid>
            </Grid>
        </ListItem>
    )
}

// cities: es un array, y en cada item tiene que tener la ciudad, pero además el country
const CityList = ({ cities, onClickCity }) => {
const [allWeather, setAllWeather] = useState({})
    useEffect(() => {
    const setWeather = async (city, country) => {
        const st = country === 'US' ? 'CA' : ''
        const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${st},${country}&limit=1&appid=${appid}`
        
        const response = await axios.get(urlGeo)
        const geoData = response.data
        //console.log("geoData [geoData]", geoData)
        
        let lat = 0
        let lon = 0
        if(geoData === undefined){
            console.log(`No geolocalization for ${city},${st},${country}`)
        }
        else{
            lat = geoData[0].lat
            lon = geoData[0].lon
            console.log(`${city}-${country}:\nLatitude ${lat}\nLongitude ${lon}`)

            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
            const response = await new axios.get(urlWeather)
            const weatherData = response.data
            //console.log("weatherData [weatherData]", weatherData)
            if(weatherData === undefined){

            }
            else
            {
                let temperature = Number(convertUnits(weatherData.main.temp).from("K").to("C").toFixed(1))
                const state = weatherData.weather[0].main.toLowerCase()
                console.log(`${city}-${country}:${temperature}, ${state}`)

                const propName = `${city}-${country}`
                const propValue = { temperature, state }

                setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue}))
            }
        }
    }
        
    cities.forEach(({city, country}) => {
        setWeather(city, country)
    });
}, [cities])

    return (
        <List>
            {
                cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry, 
                    allWeather[`${cityAndCountry.city}-${cityAndCountry.country}`]))
            }
        </List>
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
