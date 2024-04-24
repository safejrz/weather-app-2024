import React from 'react'
import CityList from './CityList'
import { action } from '@storybook/addon-actions'

export default {
    title: "CityList",
    component: CityList
}

const cities = [
    { city: "Madrid", country: "España"},
    { city: "Ciudad de México", country: "México"},
    { city: "Guadalajara", country: "México"},
    { city: "Zapopan", country: "México"},
    { city: "Concord", country: "US"},
    { city: "Anaheim", country: "US"},
]

export const CityListExample = () => <CityList cities={cities} onClickCity={action("Click en city")} />