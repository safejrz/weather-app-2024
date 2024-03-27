import React from 'react'
import { useHistory } from 'react-router-dom'
import CityList from './../components/CityList'
import AppFrame from '../components/AppFrame'
import { Paper } from '@material-ui/core'

const cities = [
    { city: "Buenos Aires", country: "Argentina"},
    { city: "Bogotá", country: "Colombia"},
    { city: "Madrid", country: "España"},
    { city: "Ciudad de México", country: "México"},
]

const MainPage = () => {
    const history = useHistory()

    const onClickHandler = () => {
        // history.push permite alterar la URL por programación
        history.push("/city")
    }

    return (
        <AppFrame>
        <Paper elevation={6}>
            <CityList 
                cities={cities} 
                onClickCity={onClickHandler} />
            </Paper>
        </AppFrame>
    )
}

export default MainPage
