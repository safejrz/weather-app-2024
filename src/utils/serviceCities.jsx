const cities = [       
    { city: "Madrid", country: "España", countryCode: "ES"},
    { city: "Ciudad de México", country: "México", countryCode: "MX"},
    { city: "Guadalajara", country: "México", countryCode: "MX"},
    { city: "Zapopan", country: "México", countryCode: "MX"},
    { city: "Concord", country: "United States", countryCode: "US"},
    { city: "Anaheim", country: "United States", countryCode: "US"},
]

export const getCities = () => (cities)

export const getCountryNameByCountryCode = (countryCode) => (
    cities.filter(c => c.countryCode === countryCode)[0].country
)