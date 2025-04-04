import { WeatherChart } from '@/components/weatherChart';
import { WeatherTable } from '@/components/weatherTable';
import { getWeatherHistory } from '@/lib/getWeatherHistory';

export default async function CityPage({ params }: { params: { name: string } }) {
  const city = decodeURIComponent(params.name);
  const history = await getWeatherHistory(city);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{city} - Weather History</h1>
      <WeatherChart data={history as any} />
      <WeatherTable data={history as any} />
    </div>
  );
}
