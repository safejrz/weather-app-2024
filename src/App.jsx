import React from 'react' //useState, useCallback, useMemo,
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/welcome*" element={<WelcomePage />} />
                    <Route path="/main*" element={<MainPage />} />
                    <Route path="/city/:countryCode/:city" element={<CityPage />} />
                    <Route path="/error" element={<ErrorBoundary saludo="HOLA!!!" />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </WeatherContext>
    )
}

export default App
