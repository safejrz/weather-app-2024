import convertUnits from 'convert-units'

export const getCityCode = (city, country) => `${city}-${country}`

export const toCelsius = (temp) => Number(convertUnits(temp).from("K").to("C").toFixed(1))