"use server";

import { CryptoChart } from "@/components/cryptoChart";
import { CryptoMetrics } from "@/components/cryptoMetrics";
import { getCryptoDetails } from "@/lib/getCryptoDetails";

interface Props {
  params: { id: string };
}

export default async function CryptoDetailPage({ params }: Props) {
  const id = params.id.toLowerCase();

  const data = await getCryptoDetails(id);

  if (!data) {
    return <div className="text-red-500">No data found for "{id}"</div>;
  }

  const { historical, metrics } = data;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1>{data.name}</h1>
      <h1 className="text-3xl font-bold mb-6 capitalize">{id} - Details</h1>
      <CryptoChart data={historical} />
      <CryptoMetrics data={metrics} />
    </div>
  );
}
