import React from 'react'
import PropTypes from 'prop-types'
//import Typography from '@material-ui/core/Typography'

const CityInfo = ({ city, country }) => {
    return (
            <>
            <h4>{city},</h4>
            <h6>{country}</h6>
            </>
    )
}

CityInfo.propTypes = {
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired
}

export default CityInfo
