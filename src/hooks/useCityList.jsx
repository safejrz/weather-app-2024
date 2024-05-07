import { useState, useEffect } from 'react'
import axios from 'axios'
import { getWeatherUrl } from './../utils/urls'
import getAllWeather from './../utils/transform/getAllWeather'
import { getCityCode } from '../utils/utils' //, toCelsius

const useCityList = (cities, allWeather, actions) => {
    // const [allWeather, setAllWeather] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        debugger
        const setWeather = async (city, countryCode) => {

            const url = getWeatherUrl({ city, countryCode })

            try {
                const propName = getCityCode(city, countryCode)

                //onSetAllWeather({ [propName]: {} })
                actions({ type: 'SET_ALL_WEATHER', payload: { [propName]: {} }})

                const response = await axios.get(url)

                const allWeatherAux = getAllWeather(response, city, countryCode)

                // setAllWeather(allWeather => ({ ...allWeather, ...allWeatherAux })
                //onSetAllWeather(allWeatherAux)
                actions({ type: 'SET_ALL_WEATHER', payload: allWeatherAux })
            } catch (error) {
                if (error.response) { // Errores que nos responde el server
                    setError("An error has occured in the server")
                } // Errores que suceden por no llegar al server (network, host unreachable)
                else if (error.request) {
                    setError("Verify internet connection")
                } // Errores imprevistos (Others)
                else {
                    setError("Error loading information")
                    console.log(error)
                }
            }

        }

        cities.forEach(({ city, countryCode }) => {
            if (!allWeather[getCityCode(city, countryCode)]) {
                setWeather(city, countryCode)
            }
        });

    }, [cities, allWeather])

    return { error, setError }
}

export default useCityList