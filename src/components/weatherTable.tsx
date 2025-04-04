interface WeatherEntry {
  date: string;
  temperature: number;
  humidity: number;
  condition: string;
}

export function WeatherTable({ data }: { data: WeatherEntry[] }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Date</th>
            <th className="p-2">Temperature (°C)</th>
            <th className="p-2">Humidity (%)</th>
            <th className="p-2">Condition</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{entry.date}</td>
              <td className="p-2">{entry.temperature}</td>
              <td className="p-2">{entry.humidity}</td>
              <td className="p-2">{entry.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
