import React from 'react'
import { useHistory } from 'react-router-dom'
import CityList from './../components/CityList'
import AppFrame from '../components/AppFrame'
import { Paper } from '@material-ui/core'

const cities = [       
    { city: "Madrid", country: "España"},
    { city: "Ciudad de México", country: "México"},
    { city: "Guadalajara", country: "México"},
    { city: "Zapopan", country: "México"},
    { city: "Concord", country: "US"},
    { city: "Anaheim", country: "US"},
]

const MainPage = () => {
    const history = useHistory()

    const onClickHandler = (city, country) => {
        // history.push permite alterar la URL por programación
        // // console.log("city ", city)
        // // console.log("country ", country)
        history.push(`/city/${country}/${city}`)
    }

    return (
        <AppFrame>
        <Paper elevation={3}>
            <CityList 
                cities={cities} 
                onClickCity={onClickHandler} />
            </Paper>
        </AppFrame>
    )    
}

export default MainPage
