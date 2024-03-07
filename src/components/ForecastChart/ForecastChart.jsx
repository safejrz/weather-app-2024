import React from "react";
import { PropTypes } from "@material-ui/core";
import Forecast from "../Forecast/Forecast";
import { LineChart, Line, CartesianGrid, XAxis, YAxis} from "recharts";

const forecastChart = ({data}) => {
    return(
        <div>
            <LineChart
            height={250}
            width={700}
            margin={{ top:20, bottom: 20, left: 5, right:5 }}
            data={data} >
                <XAxis></XAxis>
                <YAxis></YAxis>
                <CartesianGrid></CartesianGrid>
                <Line type="monotone" datKey="max" stroke="#FF0000" ></Line>
                <Line type="monotone" datKey="min" stroke="#0000FF" ></Line>
            </LineChart>            
        </div>
    )
}

ForecastChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            dayHour: PropTypes.string.isRequired,
            min: PropTypes.string.isRequired,
            max: PropTypes.string.isRequired,
        }),        
    ).isRequired,
}

export default ForecastChart