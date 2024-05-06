import { useState, useEffect } from 'react'
import axios from 'axios'
import { getCityCode, toCelsius } from '../utils/utils'
import { getWeatherUrl } from './../utils/urls'
import getAllWeather from './../utils/transform/getAllWeather'

const useCityList = (cities, allWeather, onSetAllWeather) => {
    // const [allWeather, setAllWeather] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        // debugger
        const setWeather = async (city, countryCode) => {

            const url = getWeatherUrl({ city, countryCode })

            try {
                const propName = getCityCode(city, countryCode)

                onSetAllWeather({ [propName]: {} })

                const response = await axios.get(url)

                const allWeatherAux = getAllWeather(response, city, countryCode)

                // setAllWeather(allWeather => ({ ...allWeather, ...allWeatherAux })
                onSetAllWeather(allWeatherAux)
            } catch (error) {
                if (error.response) { // Errores que nos responde el server
                    setError("An error has occured in the server")
                } // Errores que suceden por no llegar al server (network, host unreachable)
                else if (error.request) {
                    setError("Verify internet connection")
                } // Errores imprevistos (Others)
                else {
                    setError("Error loading information")
                }
            }

        }

        cities.forEach(({ city, countryCode }) => {
            if (!allWeather[getCityCode(city, countryCode)]) {  // {}
                setWeather(city, countryCode)
            }
        });

    }, [cities, onSetAllWeather, allWeather])

    return { error, setError }
}

export default useCityList