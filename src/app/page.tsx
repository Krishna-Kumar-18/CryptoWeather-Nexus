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
    weather: {

    }
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
  console.log(data);
  return (
    <main>

      <section>
        <h2>Weather</h2>
        {
          cities.map(city => {
            const cityData = data.weather[city];
            if (cityData) {
              return (
                <div>
                  <span>{city}</span>
                  <p>{cityData.temperature}</p>
                  <p>{cityData.humidity}</p>
                  <div>
                    <p>{cityData.condition?.text}</p>
                    <img src={cityData.condition?.icon} alt="icon" />
                    <pre>{cityData.condition?.code}</pre>
                  </div>
                </div>
              )
            }
            else {
              <p>"Data not found"</p>
            }
          })
        }
      </section>
      <section>Crypto</section>
      <section>News</section>
    </main>
  )
}
