import { useEffect, useState } from "react";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY2; // Secure API Key

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`;
        const res = await fetch(url);
        const json = await res.json();
        setData(json.conversion_rates);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyData();
  }, [currency, apiKey]);

  return data;
};

export default useCurrencyInfo;
