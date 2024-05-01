import React from 'react'
import { BrowserRouter as Router,
    Switch, 
    Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import CityPage from './pages/CityPage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorBoundary from './generic/ErrorBoundary/ErrorBoundary'

const App = () => {
    return (        
        <Router>
            <Switch>
                <Route exact path="/">
                    <WelcomePage />
                </Route>
                <Route path="/welcome">
                    <WelcomePage />
                </Route> 
                <Route path="/main">
                    <MainPage />
                </Route>      
                <Route path="/city">                    
                    <CityPage />
                </Route>
                <Route exact path="/error">
                    <ErrorBoundary saludo = "HOLA!!!" />
                </Route>             
                <Route>
                    <NotFoundPage />
                </Route>                    
            </Switch>
        </Router>
    )
}

export default App
