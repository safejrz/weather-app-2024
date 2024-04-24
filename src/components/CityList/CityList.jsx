import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CityInfo from './../CityInfo'
import Weather from './../Weather'
import { temp } from 'three/examples/jsm/nodes/Nodes.js'
import { unstable_batchedUpdates } from 'react-dom'
import convertUnits from 'convert-units'

// li: es un item (según tag html, tiene el role "listitem")
// renderCityAndCountry se va a convertir en una función que retorna otra función
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    const { city, country, lat, lon } = cityAndCountry
    return (
        <ListItem
            button
            key={city} 
            onClick={eventOnClickCity} >
            <Grid container 
                justify="center"
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
                        state={weather.state} />) 
                        : 
                        ("No data")
                    }                    
                </Grid>
            </Grid>
        </ListItem>
    )
}

// cities: es un array, y en cada item tiene que tener la ciudad, pero además el country
// ul: tag html para listas no ordenadas
const CityList = ({ cities, onClickCity }) => {

const [allWeather, setAllWeather] = useState({})

const appid = "62cbfa07b22ea0d74c79b059f7305a4d"

useEffect(() => {
const setWeather = (city, country, lat, lon) => {    
    //let
    // lat = 19.4326296
    // //let
    // lon = -99.1331785

    /*const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}},,${country}}&limit=1&appid=${appid}`        

    axios
        .get(urlGeo)
        .then(response => {
            const { data } = response
            lat = data[0].lat
            lon = data[0].lon
            console.log("data [data]", data)
            console.log(`${city}-${country}: Latitude ${lat} and longitude ${lon}`)
          })
    setTemp(lat, lon, city, country);*/
    
        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
        console.log(urlWeather)
    
        axios
            .get(urlWeather)
            .then(response => {
                const { data } = response                
                let temperature = Number(convertUnits(data.main.temp).from("K").to("C").toFixed(1))
                const state = data.weather[0].main.toLowerCase()
                const propName = `${city}-${country}`
                const propValue = { temperature, state}
                console.log(`${city}-${country}:${temperature}, ${state}`)
                                    
                setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue}))                    
            })
}

cities.forEach(({city, country, lat, lon}) => {
    setWeather(city, country, lat, lon)
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
