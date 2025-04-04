export interface IWeather {
  temperature?: number;
  humidity?: number;
  condition?: Record<string, any>
}

export interface IRequestBody {
  weather: Record<string, IWeather>
}

export default async function dashboard() {
  const cities = ['London', 'Tokyo', 'New York'];

  const data: IRequestBody = {
    weather: {}
  }

  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(`${process.env.BASE_API_URL}?key=${process.env.API_KEY}&q=${cities[i]}`);
      const json = await res.json();
      data.weather[cities[i]] = {
        temperature: json.current.temp_c,
        humidity: json.current.humidity,
        condition: json.current.condition
      };
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
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

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Crypto</h2>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">News</h2>
      </section>
    </main>
  );
}
