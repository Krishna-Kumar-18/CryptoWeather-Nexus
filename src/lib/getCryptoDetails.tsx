import 'server-only'

export interface ICryptoDetails {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  total_volume: number;
  price_change_percentage_24h: number;
  historical: { date: string; price: number }[];
  metrics: {
    marketCap: number;
    circulatingSupply: number;
  };
}

export async function getCryptoDetails(coinId: string): Promise<ICryptoDetails | null> {
  try {
    const [currentRes, historyRes] = await Promise.all([
      fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, {
        next: { revalidate: 3600 }
      }),
      fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`, {
        next: { revalidate: 3600 }
      })
    ]);

    if (!currentRes.ok || !historyRes.ok) return null;

    const current = await currentRes.json();
    const history = await historyRes.json();

    const historical = history.prices.map((entry: [number, number]) => ({
      date: new Date(entry[0]).toLocaleDateString(),
      price: entry[1]
    }));

    return {
      id: current.id,
      name: current.name,
      symbol: current.symbol,
      image: current.image.large,
      current_price: current.market_data.current_price.usd,
      total_volume: current.market_data.total_volume.usd,
      price_change_percentage_24h: current.market_data.price_change_percentage_24h,
      historical,
      metrics: {
        marketCap: current.market_data.market_cap.usd,
        circulatingSupply: current.market_data.circulating_supply
      }
    };
  } catch (error) {
    console.error('Error fetching crypto details:', error);
    return null;
  }
}
