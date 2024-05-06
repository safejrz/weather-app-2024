import moment from 'moment'
import { toCelsius } from '../utils'

const getForecastItemList = (data) => {
    // { hour: 18, state:"clouds", temperature:17, weekDay:"Jueves" }
    const interval = [4, 8, 12, 16, 20, 24]

    const forecastItemListAux = data.list
        .filter((item, index) => interval.includes(index))
        .map(item => {
            return ({
                hour: moment.unix(item.dt).hour(),
                weekDay: moment.unix(item.dt).format('dddd'),
                state: item.weather[0].main.toLowerCase(),
                temperature: toCelsius(item.main.temp)
            })
        }) 
    return forecastItemListAux   
}

export default getForecastItemList

export const forecastItemListExample = [
    { hour: 18, state: "clear", temperature: 17, humidity: 0, wind: 2.5, weekDay: "Jueves"},
    { hour: 6, state: "clouds", temperature: 18, humidity: 0, wind: 2.5, weekDay: "Viernes" },
    { hour: 12, state: "drizzle", temperature: 18, humidity: 0, wind: 2.5, weekDay: "Sábado" },
    { hour: 19, state: "snow", temperature: 18, humidity: 0, wind: 2.5, weekDay: "Sábado" }, //This icon does not work.
    { hour: 18, state: "thunderstorm", temperature: 19, humidity: 0, wind: 2.5, weekDay: "Domingo" },
    { hour: 14, state: "thunderstorm", temperature: 17, humidity: 0, wind: 2.5, weekDay: "Lunes" },
]