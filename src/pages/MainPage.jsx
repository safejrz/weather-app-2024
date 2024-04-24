import React from 'react'
import { useHistory } from 'react-router-dom'
import CityList from './../components/CityList'
import AppFrame from '../components/AppFrame'
import { Paper } from '@material-ui/core'

const cities = [       
    { city: "Madrid", country: "España", lat:40.4167047, lon:-3.7035825},
    { city: "Ciudad de México", country: "México", lat:19.4326296, lon:-99.1331785},
    { city: "Guadalajara", country: "México", lat: 20.6720375, lon: -103.338396,},
    { city: "Zapopan", country: "México", lat:20.7211203, lon:-103.3913671},
    { city: "Concord", country: "CA, USA", lat: 37.9768525, lon: -122.0335624},
    { city: "Anaheim", country: "CA, USA", lat: 33.8347516, lon: -117.911732}
]

const MainPage = () => {
    const history = useHistory()

    const onClickHandler = () => {
        // history.push permite alterar la URL por programación
        history.push("/city")
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
