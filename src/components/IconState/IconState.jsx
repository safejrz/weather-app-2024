import React from 'react'
import PropTypes from 'prop-types'
import {        
    WiDayCloudy,
    WiDaySunny,
    WiRain, 
    WiSnow,
    WiDayRainMix,
    WiThunderstorm,
    WiDayHaze} from 'react-icons/wi'

    //WiDayFog,
     //WiCloud,

//Thunderstorm Drizzle Rain Snow Clear Clouds
export const validValues = [
        "clouds",        
        "clear",        
        "rain",
        "snow",
        "drizzle",
        "thunderstorm",
        "haze"
    ]

        //"cloud",
        //fog,
        //"sunny",

const stateByName = {    
    clouds: WiDayCloudy,    
    clear: WiDaySunny, //sunny    
    rain: WiRain,
    snow: WiSnow,
    drizzle: WiDayRainMix,
    thunderstorm: WiThunderstorm,
    haze: WiDayHaze
}
    //cloud: WiCloud,
    //fog: WiDayFog,

const IconState = ({ state }) => {
    const StateByName = stateByName[state]
    return (
        <StateByName />
    )
}

IconState.propTypes = {
    state: PropTypes.oneOf(validValues).isRequired,
}

export default IconState
