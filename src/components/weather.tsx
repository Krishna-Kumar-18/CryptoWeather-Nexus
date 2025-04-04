export interface IWeather {
  temperature?: number;
  humidity?: number;
  condition?: Record<string, any>
}

export interface IRequestBody {
  weather: Record<string, IWeather>
}


export default function Weather({ cities, data }: { cities: string[], data: IRequestBody }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Weather</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          cities.map(city => {
            const cityData = data.weather[city];
            return cityData ? (
              <div key={city} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
                <span className="text-lg font-semibold text-indigo-700">{city}</span>
                <p className="text-sm text-gray-600">Temperature: {cityData.temperature}°C</p>
                <p className="text-sm text-gray-600">Humidity: {cityData.humidity}%</p>
                <div className="mt-2 flex items-center gap-3">
                  {cityData.condition?.icon && (
                    <img src={cityData.condition.icon} alt="icon" className="w-10 h-10" />
                  )}
                  <div>
                    <p className="text-sm text-gray-700">{cityData.condition?.text}</p>
                    <pre className="text-xs text-gray-500">{cityData.condition?.code}</pre>
                  </div>

                </div>
              </div>
            ) : (
              <div key={city} className="bg-red-100 p-4 rounded-lg text-red-600 shadow">
                <p>Data not found for {city}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}
