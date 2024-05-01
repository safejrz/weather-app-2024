import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activo: false
        }
    }


    estaActivo = () => {
        return this.state.activo ? "Activo" : "NoActivo"
    }


    onClickHandler = () => {        
        //this.state.activo = true;
        this.setState({ activo: !this.state.activo })
    }

    componentDidMount () {
        console.log("el componente se ha montado")
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("estado previo: ", prevState.activo)
        console.log("estado nuevo: ", this.state.activo)
        console.log("el componente se ha actualizado")
    }

    componentWillUnmount() {
        console.log("El componente se ha desmontado")
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickHandler}>Activar</button>
                <h1>
                    ErrorBoundary {this.props.saludo} 
                    {
                        this.estaActivo()
                    }
                </h1>
            </div>
        )
    }
}

export default ErrorBoundary
