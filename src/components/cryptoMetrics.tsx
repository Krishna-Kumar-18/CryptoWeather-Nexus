export function CryptoMetrics({ data }: { data?: any }) {
  if (!data || !data.marketCap) {
    return <div className="text-gray-500">Loading metrics...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white shadow p-4 rounded-2xl">
        <p className="text-black">Market Cap</p>
        <p className="font-bold text-lg text-indigo-700">
          ${data.marketCap.toLocaleString()}
        </p>
      </div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <p className="text-black">Circulating Supply</p>
        <p className="font-bold text-lg text-indigo-700">
          {data.circulatingSupply?.toLocaleString() ?? "N/A"}
        </p>
      </div>
    </div>
  );
}
