import 'server-only';

export interface IWeatherHistory {
  date: string;
  temperature: number;
  humidity: number;
  condition: string;
  icon: string;
}

export async function getWeatherHistory(city: string): Promise<IWeatherHistory[] | null> {
  const apiKey = process.env.WEATHER_API_KEY;
  const today = new Date();

  const promises = Array.from({ length: 7 }).map(async (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formatted = date.toISOString().split('T')[0];

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${formatted}`,
        { next: { revalidate: 3600 } }
      );

      const data = await res.json();
      const forecastDay = data?.forecast?.forecastday?.[0];
      const day = forecastDay?.day;
      const condition = day?.condition;

      if (!day || !condition) {
        console.warn(`Missing or invalid day data for ${formatted}`, data);
        return null;
      }

      return {
        date: formatted,
        temperature: typeof day.avgtemp_c === 'number' ? day.avgtemp_c : 0,
        humidity: typeof day.avghumidity === 'number' ? day.avghumidity : 0,
        condition: condition.text || 'N/A',
        icon: condition.icon || '',
      };
    } catch (err) {
      console.error(`Error fetching weather history for ${city} on ${formatted}:`, err);
      return null;
    }
  });

  const results = await Promise.all(promises);
  return results.filter(Boolean) as IWeatherHistory[];
}
