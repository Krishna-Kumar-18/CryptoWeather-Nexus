'use client';

import { useEffect, useState } from 'react';

export default function Crypto() {
  const [coin, setCoin] = useState({
    bitcoin: 0,
    ethereum: 0,
    monero: 0
  });

  useEffect(() => {
    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setCoin(prev => ({
        ...prev,
        ...data
      }));
    };

    return () => ws.close();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow max-w-md mt-6 mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-black">Live Crypto Prices</h2>
      <ul className="space-y-2 text-indigo-700 font-mono">
        <li>Bitcoin: ${parseFloat(coin.bitcoin.toString()).toFixed(2)}</li>
        <li>Ethereum: ${parseFloat(coin.ethereum.toString()).toFixed(2)}</li>
        <li>Monero: ${parseFloat(coin.monero.toString()).toFixed(2)}</li>
      </ul>
    </div>
  );
}
