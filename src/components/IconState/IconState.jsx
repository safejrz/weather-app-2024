import React from 'react'
import PropTypes from 'prop-types'
import {        
    WiDayCloudy,
    WiDaySunny,
    WiRain, 
    WiSnow,
    WiThunderstorm} from 'react-icons/wi'

    //WiDayFog,
     //WiCloud,

//Thunderstorm Drizzle Rain Snow Clear Clouds
export const validValues = [
        "clouds",        
        "clear",        
        "rain",
        "snow",
        "drizzle",
        "thunderstorm"
    ]

        //"cloud",
        //fog,
        //"sunny",

const stateByName = {    
    clouds: WiDayCloudy,    
    clear: WiDaySunny, //sunny    
    rain: WiRain,
    snow: WiSnow,
    drizzle: null,
    thunderstorm: WiThunderstorm
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
