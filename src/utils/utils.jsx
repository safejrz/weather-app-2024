import convertUnits from 'convert-units'

export const toCelcius = (temp) => Number(convertUnits(temp).from("K").to("C").toFixed(1))

export const getCityCode = (city, country) => `${city}-${country}`

export const chartDataExample = [
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

export const forecastItemListExample = [
    { hour: 18, state: "clear", temperature: 17, weekDay: "Jueves" },
    { hour: 6, state: "clouds", temperature: 18, weekDay: "Viernes" },
    { hour: 12, state: "drizzle", temperature: 18, weekDay: "Sábado" },
    { hour: 19, state: "snow", temperature: 18, weekDay: "Sábado" }, //This icon does not work.
    { hour: 18, state: "thunderstorm", temperature: 19, weekDay: "Domingo" },
    { hour: 14, state: "thunderstorm", temperature: 17, weekDay: "Lunes" },
]