import React from 'react'
import PropTypes from 'prop-types'
import {
    WiDayCloudy,
    WiDaySunny,
    WiRain,
    WiSnow,
    WiDayRainMix,
    WiThunderstorm,
    WiDayHaze
} from 'react-icons/wi'

export const validValues = [
    "clouds",
    "clear",
    "rain",
    "snow",
    "drizzle",
    "thunderstorm",
    "haze"
]

const stateByName = {
    clouds: WiDayCloudy,
    clear: WiDaySunny,
    rain: WiRain,
    snow: WiSnow,
    drizzle: WiDayRainMix,
    thunderstorm: WiThunderstorm,
    haze: WiDayHaze
}

const IconState = ({ state }) => {
    let StateByName = stateByName['haze'] // could default some other values here. haze, smog, fog.
    if (validValues.includes(state)) {
        StateByName = stateByName[state]        
    }

    return (
        <StateByName />
    )
}

IconState.propTypes = {
    state: PropTypes.oneOf(validValues).isRequired,
}

export default IconState
