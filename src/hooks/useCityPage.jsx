import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { chartDataExample, forecastItemListExample } from '../utils/utils'

const appid = process.env.REACT_APP_APIKEY

const useCityPage = () => {    
    const [error, setError] = useState(null)
    const { city, country } = useParams()

    //here is where you could define these arrays if the API worked properly:
    const chartData = chartDataExample
    const forecastItemList = forecastItemListExample

    // useEffect(() => {

    //     const getForecast = async () => {

    //         try {
    //             const st = country === 'US' ? 'CA' : ''
    //             const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${st},${country}&limit=1&appid=${appid}`
    //             let geoResponse = await axios.get(urlGeo)
    //             const geoData = geoResponse.data
    //             let lat = geoData[0].lat
    //             let lon = geoData[0].lon

    //             //// PROBLEM: API is no longer free, this endpoint is only available through suscription:
    //             // const urlForecast = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${appid}`
    //             // let forecastResponse = await axios.get(urlForecast)

    //             // if (!forecastResponse || !forecastResponse.data) 
    //             // {
    //             //     console.log("Error thrown!!!!!!!!!!!!")
    //             //     throw new Error(`No weather data for ${city},${st},${country}`)
    //             // }

    //             // const forecastData = forecastResponse.data

    //             const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
    //             let weatherResponse = await new axios.get(urlWeather)

    //             if (!weatherResponse || !weatherResponse.data) {
    //                 throw new Error(`No weather data for ${city},${st},${country}`)
    //             }

    //             const weatherData = weatherResponse.data
    //             if (weatherData !== undefined) {                    
    //                 const temperature = toCelcius(weatherData.main.temp)
    //                 const weatherState = weatherData.weather[0].main.toLowerCase()
    //                 const wind = weatherData.wind.speed
    //                 setState({
    //                     temperature: temperature,
    //                     state: weatherState,
    //                     humidity: 0,
    //                     wind: wind
    //                 })
    //             }
    //         }
    //         catch (error) {
    //             //Errores que nos responde el server (500, 400, etc.)
    //             if (error.response) {
    //                 const { data, status } = error.response
    //                 console.log("data", data)
    //                 console.log("status", status)
    //                 // setError("An error has occured in the server")
    //             }//Errores que suceden por no llegar al server (network, host unreachable)
    //             else if (error.request) {
    //                 console.log("Server unreachable or no internet")
    //                 // setError("Verify internet connection")
    //             }//Errores imprevistos (Others)
    //             else {
    //                 console.log(`Exception: ${error.message}`)
    //                 // setError("Error loading information")
    //             }
    //         }
    //     }

    // //    getForecast()      
    // }, [city, country])

    return { city, country, chartData, forecastItemList, error, setError }
}

export default useCityPage