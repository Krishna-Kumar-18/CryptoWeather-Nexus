import Cryto from "@/components/crypto";
import Weather, { IRequestBody } from "@/components/weather";

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

      <Weather cities={cities} data={data} />
      <Cryto />
      <section>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">News</h2>
      </section>
    </main>
  );
}
