import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDeliveredStateFromError(error) {
        return { hasError: true }
    }

    render() {
        return (
            this.state.hasError ?
            (<h1>Hubo un Error</h1>)
            :
            (this.props.children)            
        )
    }  
}

export default ErrorBoundary
