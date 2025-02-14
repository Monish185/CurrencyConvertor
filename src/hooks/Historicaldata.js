import { useEffect, useState } from "react";

const useHistoricalData = (baseCurrency, targetCurrency) => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      let today = new Date();
      let pastMonth = new Date(today);
      pastMonth.setDate(today.getDate() - 30);

      let dateRange = [];
      for (let i = 0; i < 30; i++) {
        let date = new Date(pastMonth);
        date.setDate(pastMonth.getDate() + i);
        dateRange.push(date.toISOString().split("T")[0]);
      }

      let rates = [];
      const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY; // Secure API Key

      for (const date of dateRange) {
        let url = `https://openexchangerates.org/api/historical/${date}.json?app_id=${apiKey}&base=${baseCurrency}&symbols=${targetCurrency}`;

        try {
          const res = await fetch(url);
          const data = await res.json();
          if (data.rates) {
            rates.push({ date, rate: data.rates[targetCurrency] });
          }
        } catch (error) {
          console.error(`Error fetching data for ${date}:`, error);
        }
      }
      setHistoricalData(rates);
    };

    fetchHistoricalData();
  }, [baseCurrency, targetCurrency]);

  return historicalData;
};

export default useHistoricalData;
