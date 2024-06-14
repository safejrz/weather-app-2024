import React from 'react' //useState, useCallback, useMemo,
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import CityPage from './pages/CityPage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorBoundary from './generic/ErrorBoundary/ErrorBoundary'
import { WeatherContext } from './WeatherContext'

const App = () => {
    return (
        <WeatherContext>
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
                    <Route path="/city/:countryCode/:city">
                        <CityPage />
                    </Route>
                    <Route exact path="/error">
                        <ErrorBoundary saludo="HOLA!!!" />
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </WeatherContext>
    )
}

export default App
